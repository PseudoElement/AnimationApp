import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { IOption } from 'src/app/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements AfterContentInit {
    @Input() options!: IOption[];
    @Input() label: string = '';
    @Output() onChange: EventEmitter<number | string> = new EventEmitter();
    isOpen: boolean = false;
    selectedOption!: IOption;

    ngAfterContentInit(): void {
        console.log('OPT', this.options);
        this.selectedOption = this.options[0];
    }
    public setSelectedOption(option: IOption) {
        this.selectedOption = option;
        this.onChange.emit(this.selectedOption.value);
    }
    public onSelectClick() {
        this.isOpen = !this.isOpen;
    }
    public onClose() {
        this.isOpen = false;
    }
}
