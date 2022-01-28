/**********************************************************************
 *
 * @模块名称: type.d
 *
 * @模块用途: type.d
 *
 * @date: 2022/1/27 17:30
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export type ImageUploadConfig = {
    width?: string | number;
    height?: string | number;
    'picture-width'?: string | number;
    'picture-height'?: string | number;
    action?: string;
    'list-type'?: 'picture-card' | 'picture';
    multiple?: boolean;
    accept?: string;
    'max-count'?: number;
    'file-list'?: any[];
}


