import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-upload-image',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
    @Input() imageSrc?: string;
    @Output() changeFileValue: EventEmitter<Event> = new EventEmitter();

    public onChange(e: any) {
        this.changeFileValue.emit(e);
    }
}
