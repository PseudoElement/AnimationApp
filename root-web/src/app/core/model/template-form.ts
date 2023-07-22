import { InputTypes } from 'src/app/core';

export interface IControl {
    value: string;
    name: string;
    disabled: boolean;
    validation: IValidator;
    id: string;
    type: InputTypes;
    label?: string;
    placeholder?: string;
}

export interface IValidator {
    minLength: number | null;
    maxLength: number | null;
    min: number | null;
    max: number | null;
    pattern: string;
    required: boolean;
    email: boolean;
}
