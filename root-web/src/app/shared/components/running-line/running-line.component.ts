import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-running-line',
    templateUrl: './running-line.component.html',
    styleUrls: ['./running-line.component.scss'],
})
export class RunningLineComponent implements OnInit {
    @Input() images: string[] = [];
    @Input() text?: string;
    @Input() imgWidth: number = 100;
    @Input() imgHeight: number = 100;
    @Input() dir: 'rtl' | 'ltr' = 'rtl';

    ngOnInit(): void {
        const root = document.documentElement;
        const marginRight = 10; // change it if it was changed in css (img tag) - default 10px
        const translateX = -(this.imgWidth * this.images.length + marginRight * this.images.length);
        switch (this.dir) {
            case 'ltr':
                root.style.setProperty('--start', translateX + 'px');
                root.style.setProperty('--end', 0 + 'px');
                break;
            case 'rtl':
                root.style.setProperty('--start', 0 + 'px');
                root.style.setProperty('--end', translateX + 'px');
        }
    }

    constructor(private el: ElementRef) {}
}
