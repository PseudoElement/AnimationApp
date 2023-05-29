import { AbstractControl } from '@angular/forms';

export function confirmPasswords(controlName: string, matchControlName: string) {
    return (form: AbstractControl) => {
        const control = form.get(controlName);
        const matchControl = form.get(matchControlName);
        if (control?.value === matchControl?.value) {
            return null;
        }
        const error = control?.value === matchControl?.value ? null : { passwordMismatch: true };
        matchControl?.setErrors(error);
        return { matchPassword: true };
    };
}
