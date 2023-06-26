import { Component, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { zoomInOnEnterAnimation } from 'angular-animations';
import { Subscription } from 'rxjs';
import {
    AnimationTypes,
    IApplicationCard,
    IOption,
    SidesX,
    pageSizeOptions,
    productsWebApps,
    scrollToStart,
} from 'src/app/core';
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
    pageIndex: number = 0;
    limit: number = 2;
    pageSizeOptions: IOption[] = pageSizeOptions;
    constructor(private productsService: ProductsService) {
        this.loadedWebCards = productsWebApps.slice(0, this.pageIndex + this.limit);
        this.webTotalCount = productsWebApps.length;
        // this.productsService.getAllWebApplications().subscribe((apps) => (this.webTotalCount = apps.length));
        this._getPortionOfApps(0, this.limit);
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

    public onPaginationMock(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this._getPortionOfApps(this.pageIndex * this.limit, this.limit);
    }

    public onPageSizeChange(limit: number | string) {
        this.limit = limit as number;
        this._getPortionOfApps(0, this.limit); //<---------------Для мок-данных
        // this._getPortionOfApps(1, this.limit);
    }
    private _getPortionOfApps(pageIndex: number, limit: number = this.limit): void {
        // console.log(pageIndex, pageIndex + limit);
        this.loadedWebCards = productsWebApps.slice(pageIndex, pageIndex + limit);
        // console.log(this.loadedWebCards);
        // return this.productsService.getPortionOfApps(pageIndex, limit).subscribe((apps) => {
        //     this.loadedWebCards = apps;
        // });
    }
}
