import { IErrors, IErrorsData } from '../model';

export const transformErrorsEN = ({
    max = 10000000000,
    maxlength = 20,
    min = 0,
    minlength = 8,
}: Partial<IErrorsData>) => {
    return {
        email: 'Enter correct email',
        required: 'Required field',
        minlength: `Minimum length - ${minlength} char`,
        maxlength: `Maximum length - ${maxlength} char`,
        min: `Minimal count - ${min} char`,
        max: `Maximum count - ${max}char`,
        pattern: 'Password should contain at least 1 digit, 1 uppercase letter, 1 lowercase letter',
        passwordMismatch: "Passwords don't match",
    };
};
