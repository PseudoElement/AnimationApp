import { Component, EventEmitter, Input, Output, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-input-radio',
    templateUrl: './input-radio.component.html',
    styleUrls: ['./input-radio.component.scss'],
})
export class InputRadioComponent implements ControlValueAccessor, OnInit {
    @Input({ required: true }) id: string | number = '';
    @Input({ required: true }) name: string = '';
    @Input({ required: true }) label: string = '';
    @Input({ required: true }) value: string | number = '';
    @Input({ required: true }) activeValue: string | number = '';
    @Input({ required: true }) checked: boolean = false;
    @Output() onValueChange: EventEmitter<string | number> = new EventEmitter();
    model: any;
    private onChange = (value: string | number) => {};
    private onTouched = () => {};
    constructor(@Self() private ngControl: NgControl) {}

    ngOnInit(): void {
        this.ngControl.control?.valueChanges.subscribe((value) => {
            if (this.model === value) return;
            this.writeValue(this.value);
        });
    }
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(value: any) {
        this.model = value;
    }

    public setValue(): void {
        this.model = this.model === this.value ? null : this.value;
        this.onChange(this.model);
    }
}
