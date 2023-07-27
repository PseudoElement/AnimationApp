import { IControl, IUser, IUserWithName } from 'src/app/core';
export interface IUpdateUserPhotoRequest {
    id: string;
    newPhoto: File;
}
export interface IUpdateUserEmailRequest {
    id: string;
    email: string;
}
export interface IUpdateUserPasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface IUpdateUserEmailRes extends IUser {}

export interface IFormBuilderData {
    submitButtonText: string;
    controls: IControl[];
}

export interface IUpdateUserPhotoRes {
    photoSrc: string;
}
