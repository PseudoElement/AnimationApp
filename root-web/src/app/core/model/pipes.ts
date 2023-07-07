export interface IErrors {
    email: string;
    required: string;
    minlength: string;
    maxlength: string;
    pattern: string;
    passwordMismatch: string;
}

export type SignTypes = 'dot' | 'exclamation' | 'question';
