import { Component, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { zoomInOnEnterAnimation } from 'angular-animations';
import { AnimationTypes, IApplicationCard, IOption, SidesX, pageSizeOptions, scrollToStart } from 'src/app/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { SelectComponent } from 'src/app/shared/components/select/select.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [zoomInOnEnterAnimation()],
})
export class ProductsComponent implements AfterViewInit {
    activeSlide: SidesX = 'left';
    loadedWebCards: IApplicationCard[] = [];
    webTotalCount: number = 0;
    pageIndex: number = 1;
    limit: number = 2;
    pageSizeOptions: IOption[] = pageSizeOptions;
    constructor(private productsService: ProductsService) {
        this.productsService.getAllWebApplications().subscribe((apps) => (this.webTotalCount = apps.length));
        this._getPortionOfApps(this.pageIndex, this.limit);
    }
    @ViewChild(SelectComponent) select!: SelectComponent;
    @HostListener('click', ['$event']) onCloseSelect(e: Event) {
        !(e.target as HTMLElement).closest('.select-wrapper') && this.select.onClose();
    }

    ngAfterViewInit(): void {
        scrollToStart();
    }

    get AnimationTypes() {
        return AnimationTypes;
    }
    public setActiveSlide(activeSlide: SidesX) {
        this.activeSlide = activeSlide;
    }
    public onPagination(pageIndex: number): void {
        this.pageIndex = pageIndex + 1;
        this._getPortionOfApps(this.pageIndex, this.limit);
    }

    public onPageSizeChange(limit: number | string) {
        this.limit = limit as number;
        this._getPortionOfApps(1, this.limit);
    }

    private _getPortionOfApps(pageIndex: number, limit: number = this.limit): void {
        this.productsService.getPortionOfApps(pageIndex, limit).subscribe((apps) => {
            this.loadedWebCards = apps;
            console.log(this.loadedWebCards);
        });
    }
}
