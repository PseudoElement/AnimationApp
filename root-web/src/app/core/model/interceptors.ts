import { HttpErrorResponse } from '@angular/common/http';

export interface IErrorInnerInHttpErrorResponse {
    error: string;
    message: string[] | string;
    statusCode: number;
}

export interface IExtendedHttpErrorResponse extends HttpErrorResponse {
    error: IErrorInnerInHttpErrorResponse;
}
