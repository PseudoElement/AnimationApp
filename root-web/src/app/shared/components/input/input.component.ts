import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputTypes } from 'src/app/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() control: FormControl<string | null> = new FormControl('');
    @Input() placeholder?: string;
    @Input() name?: string;
    @Input() id?: string;
    @Input() label: string = '';
    @Input() type?: InputTypes = 'text';
    ngOnInit() {
        console.log(this.control);
    }
    get error(): string | null {
        if (!this.control.errors) return null;
        else return Object.keys(this.control.errors)[0];
    }
}
