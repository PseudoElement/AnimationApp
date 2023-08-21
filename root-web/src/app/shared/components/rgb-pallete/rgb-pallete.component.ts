import { Component, Input, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import iro from '@jaames/iro';
import { DefaultColors, PalleteLayout } from './rgb-pallete.model';

@Component({
    selector: 'app-rgb-pallete',
    templateUrl: './rgb-pallete.component.html',
    styleUrls: ['./rgb-pallete.component.scss'],
})
export class RgbPalleteComponent implements OnDestroy, AfterViewInit {
    @Input({ required: true }) id!: string;
    @Input() defaultColor: DefaultColors = '#f00';
    @Input() width: number = 300;
    @Input() margin: number = 10;
    @Input() padding: number = 10;
    @Input() markerRadius: number = 10;
    @Output() onColorChange: EventEmitter<string> = new EventEmitter();
    colorPicker: any;
    constructor() {}

    ngAfterViewInit(): void {
        this.colorPicker = iro.ColorPicker(`#${this.id}`, {
            width: this.width,
            color: this.defaultColor,
            margin: this.margin,
            padding: this.padding,
            handleRadius: this.markerRadius,
        });
        this.colorPicker.on('color:change', (color: any) => this._onColorChange(color));
    }

    ngOnDestroy(): void {
        this.colorPicker.off('color:change', this._onColorChange);
    }

    private _onColorChange(color: any) {
        this.onColorChange.emit(color.hexString);
    }
}
