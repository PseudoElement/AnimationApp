import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IErrors, InputTypes } from 'src/app/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() control: FormControl<any> = new FormControl('');
    @Input() placeholder?: string;
    @Input() name?: string;
    @Input() id?: string;
    @Input() label: string = '';
    @Input() type?: InputTypes = 'text';
    get error(): keyof IErrors | null {
        if (!this.control.errors) return null;
        else return Object.keys(this.control.errors)[0] as keyof IErrors;
    }
}
