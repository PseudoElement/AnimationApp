import { IErrors } from '../model';

export const errorsEN: IErrors = {
    email: 'Enter correct email',
    required: 'Required field',
    minlength: 'Minimum length - 8 char',
    maxlength: 'Maximum length - 20 char',
    pattern: 'Password should contain at least 1 digit, 1 uppercase letter, 1 lowercase letter',
    passwordMismatch: "Passwords don't match",
};
