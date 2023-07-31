import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IRadioInput } from 'src/app/core';

@Component({
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent implements OnInit {
    @Input({ required: true }) data: IRadioInput[] = [];
    @Input() title: string = '';
    @Output() changeActiveValue: EventEmitter<string | number> = new EventEmitter();
    activeValue!: string | number;

    ngOnInit(): void {
        this.activeValue = this.data[0].value;
    }

    public onChange(value: string | number): void {
        this.activeValue = value;
        this.changeActiveValue.emit(this.activeValue);
    }
}
