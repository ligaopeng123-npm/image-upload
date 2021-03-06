import {isString} from '@gaopeng123/utils.types';
import {parentByExpected} from '@gaopeng123/utils.object';
import {blob2Base64} from "@gaopeng123/utils.file";
import {isDelIcon, isPictureImg, isPictureItem, openToPreviewBase64} from "./utils";
import {pictureTemplate, template, ImageUploadConfig} from "./template";
import {initMsg} from './message';

export default class ImageUpload extends HTMLElement {
    shadow: any = null;
    qmsg: any = null;
    /**
     * 保存配置信息
     */
    __config: ImageUploadConfig = {
        width: '100%',
        height: 200,
        'picture-width': 48,
        'picture-height': 48,
        action: '', // 上传地址
        'list-type': 'picture', // picture 和 picture-card
        accept: '.png,.jpg,.jpeg', // 支持图片类型
        multiple: true, // 是否支持多选
        'max-count': Number.MAX_SAFE_INTEGER, // 最多限制上传的数据
        'file-list': [],
    }

    get config() {
        return this.__config;
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.qmsg = initMsg(this);
        this.qmsg.config({
            showClose: true
        });
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.shadow.innerHTML = template(this.config);
        this.addEvent();
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.removeEvent();
    }


    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return [
            'width',
            'height',
            'picture-width',
            'picture-height',
            'list-type',
            'accept',
            'multiple',
            'action',
            'max-count',
            'file-list'
        ];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            // @ts-ignore
            this.__config[name] = newValue;
            if (name === 'file-list') {
                this.renderFileList();
            }
        }
    }

    addEvent() {
        this.addPasteEvent();
        this.addPictureClick();
        this.addUploadClick();
        this.addUploadChange();
    }

    removeEvent() {
        this.removePasteEvent();
        this.removePictureClick();
        this.removeUploadClick();
        this.removeUploadChange();
    }

    /**
     * 渲染list表格
     */
    renderFileList() {
        // @ts-ignore
        const fileList = isString(this.config['file-list']) ? JSON.parse(this.config['file-list']) : this.config['file-list'];
        this.fileList = fileList;
        this.fileList.forEach((file: any) => {
            this.insertPicture(file.url || file, file);
        });
    }

    /**
     * 是否达到最大值
     */
    isMax() {
        if (this.fileList.length >= this.maxCount) {
            this.qmsg.info(`上传图片不能多于${this.maxCount}张`);
            return true;
        }
        return false;
    }

    /**
     * 最多上传图片数量
     */
    get maxCount() {
        return Number(this.config['max-count'])
    }

    /**
     * 获取当前存在列表的数据
     */
    __fileList: any[] = [];

    get fileList(): any {
        return this.__fileList;
    }

    set fileList(files) {
        this.__fileList = files;
    }

    getFileList = () => {
        return this.fileList;
    }
    /**
     * 预览处理
     */
    previewProcessing = (base64: string, file: File) => {
        this.insertPicture(base64, file);
        this.uploadFetch(file);
        this.dispatchEvent(new CustomEvent('uploadChange', {
            detail: {file: file}
        }));
        this.fileList.push(file);
    }
    /**
     * 处理上传
     * @param file
     */
    uploadFetch = (file: File) => {
        if (this.config.action) {
            const formData = new FormData();
            formData.append('file', file);
            fetch(this.config.action, {
                method: 'post',
                body: formData,
            })
                .then(response => response.json())
                .then((data) => {
                    this.dispatchEvent(new CustomEvent('afterUpload', {
                        detail: data
                    }));
                });
        }
    }
    /**
     * 监听粘贴事件
     * @param event
     */
    onPaste = (event: any) => {
        event.preventDefault();
        // @ts-ignore
        const pasteData = event.clipboardData || window.clipboardData;
        //获取图片内容
        const blob = pasteData.items[0].getAsFile();
        //判断是不是图片，最好通过文件类型判断
        const isImg = (blob && 1) || -1;
        if (isImg < 0) {
            return;
        }
        blob2Base64(blob).then((base64_str) => {
            this.previewProcessing(base64_str, blob);
        });
    }
    /**
     * 图片点击事件
     * @param event
     */
    onPictureClick = (event: any) => {
        // 点击的是picture-item
        if (isPictureItem(event.target) || isPictureImg(event.target)) {
            const img = event.target.querySelector('img') || event.target;
            const base64 = img.getAttribute('src');
            openToPreviewBase64(base64);
        }
        // 点击的删除按钮
        else if (isDelIcon(event.target)) {
            this.removePicture(event.target);
        }
    }
    /**
     * 上传按钮点击事件
     * @param event
     */
    onUploadClick = (event: Event) => {
        event.stopPropagation();
        this.uploadInput.click();
    }
    /**
     * 上传input触发事件
     * @param event
     */
    onUploadChange = (event: Event) => {
        // @ts-ignore
        const files = event.target.files;
        if (!this.isMax() && (files.length + this.fileList.length) <= this.maxCount) {
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(blob2Base64(files[i]));
            }
            Promise.all(promises).then((urls) => {
                urls.forEach((base64_str, index) => {
                    this.previewProcessing(base64_str, files[index]);
                })
            });
        } else {
            this.qmsg.info(`上传图片不能多于${this.maxCount}张`);
        }
    }

    addPasteEvent() {
        this.imageUploadTarget.addEventListener('paste', this.onPaste);
    }

    removePasteEvent() {
        this.imageUploadTarget.removeEventListener('paste', this.onPaste);
    }

    addPictureClick() {
        this.imageUploadList.addEventListener('click', this.onPictureClick);
    }

    removePictureClick() {
        this.imageUploadList.removeEventListener('click', this.onPictureClick);
    }

    addUploadClick() {
        this.uploadBth.addEventListener('click', this.onUploadClick);
    }

    removeUploadClick() {
        this.uploadBth.removeEventListener('click', this.onUploadClick);
    }

    addUploadChange() {
        this.uploadInput.addEventListener('change', this.onUploadChange);
    }

    removeUploadChange() {
        this.uploadInput.removeEventListener('change', this.onUploadChange);
    }

    get imageUploadTarget() {
        return this.shadow.querySelector('#screenshot-upload-target');
    }

    get imageUploadList() {
        return this.shadow.querySelector('#screenshot-upload-list');
    }

    get uploadBth() {
        return this.shadow.querySelector('#upload-bth');
    }

    get uploadInput() {
        return this.shadow.querySelector('#screenshot-upload-input');
    }

    /**
     * 插入图片
     */
    insertPicture = (url: string, file?: File) => {
        this.imageUploadList.appendChild(pictureTemplate(url, this.config, file));
    }

    /**
     * 删除图片
     * @param target
     */
    removePicture(target: any) {
        const rPicture = this.findRemovePicture(target);
        const pictureList = this.imageUploadList.querySelectorAll('.picture-item');
        let delFile;
        // 删除fileList中维护的数据
        for (let i = 0; i < pictureList.length; i++) {
            if (rPicture === pictureList[i]) {
                delFile = this.fileList.splice(i, 1);
            }
        }
        this.imageUploadList.removeChild(rPicture);
        this.dispatchEvent(new CustomEvent('afterDelete', {
            detail: {file: delFile}
        }));
    }

    /**
     * 找到要移除的图片
     * @param targe
     */
    findRemovePicture(targe: any) {
        return parentByExpected(targe, (current: any) => {
            return isPictureItem(current);
        })
    }
}

if (!customElements.get('image-upload')) {
    customElements.define('image-upload', ImageUpload);
}
