import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { IErrors, IValidator, InputTypes } from 'src/app/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() control: FormControl<unknown> = new FormControl();
    @Input() placeholder?: string;
    @Input() ngModel: string = '';
    @Output() ngModelChange: EventEmitter<string> = new EventEmitter();
    @Input() name!: string;
    @Input() id?: string;
    @Input() label: string = '';
    @Input() validation: IValidator = {
        email: false,
        max: null,
        maxLength: null,
        min: null,
        minLength: null,
        pattern: '',
        required: true,
    };
    @Input() disabled: boolean = false;
    @Input() type?: InputTypes = 'text';
    @Input() isFormControl?: boolean = true;
    public getError(control: NgModel | FormControl): keyof IErrors | null {
        if (!control.errors) return null;
        else return Object.keys(control.errors)[0] as keyof IErrors;
    }

    public onChange(value: string) {
        this.ngModelChange.emit(value);
    }
}
