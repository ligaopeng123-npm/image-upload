// @ts-ignore
import ImageUpload from './index.js';

/**
 * 处理react tsx中直接使用web components报错问题
 */
// @ts-ignore
export declare interface ImageUploadProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    width?: string | number;
    height?: string | number;
    'picture-width'?: string | number;
    'picture-height'?: string | number;
    action?: string;
    'list-type'?: 'picture-card' | 'picture';
    multiple?: boolean;
    accept?: string;
    'max-count': number; // 最大上传个数
    'file-list'?: any[];
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'login-module': ImageUploadProps
        }
    }
}

export declare type UploadChange = {
    detail: any,
    [propName: string]: any,
}

export declare type AfterUpload = {
    detail: any,
    [propName: string]: any,
}

// @ts-ignore
export default ImageUpload;
