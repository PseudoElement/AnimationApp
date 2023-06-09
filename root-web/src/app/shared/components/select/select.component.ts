import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { IOption } from 'src/app/core';
import { opacityAnimation, showHideAnimation } from '../../animations';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    animations: [opacityAnimation, showHideAnimation(120)],
})
export class SelectComponent implements AfterContentInit {
    @Input() selectedValue: string | number = '';
    @Input() options!: IOption[];
    @Input() label: string = '';
    @Output() onChange: EventEmitter<number | string> = new EventEmitter();
    isOpen: boolean = false;
    selectedOption!: IOption;

    ngAfterContentInit(): void {
        this.selectedOption = this.options.find((opt) => opt.value === this.selectedValue) ?? this.options[0];
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
