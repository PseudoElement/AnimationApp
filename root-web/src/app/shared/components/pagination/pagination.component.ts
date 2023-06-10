import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    AfterViewInit,
    ViewChild,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { colors } from 'src/app/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements AfterViewInit, OnChanges {
    @Input() pageSize: number = 3;
    @Input() totalCount!: number;
    @Output() currentPageChange: EventEmitter<number> = new EventEmitter();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    el?: HTMLElement;
    arrowSize: string = '50px';
    svgArrows!: Array<HTMLElement>;

    constructor(private elRef: ElementRef) {}
    ngAfterViewInit(): void {
        this.el = this.elRef?.nativeElement as HTMLElement;
        const wrapper = this.el.querySelector('.mat-mdc-paginator-range-actions') as HTMLElement;
        wrapper.style.alignItems = 'center';
        const btns = Array.from(this.el.querySelectorAll('.mat-mdc-tooltip-trigger')) as Array<HTMLElement>;
        btns.forEach((btn) => {
            btn.style.background = colors.rgbaBlack08;
            btn.style.marginLeft = '10px';
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.totalCount && changes.pageSize) this.paginator.firstPage();
    }
}
