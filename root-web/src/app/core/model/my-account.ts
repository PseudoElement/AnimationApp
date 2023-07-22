import { IControl } from 'src/app/core';
export interface IUpdateUserPhotoRequest {
    id: string;
    newPhoto: File;
}

export interface IFormBuilderData {
    submitButtonText: string;
    controls: IControl[];
}
