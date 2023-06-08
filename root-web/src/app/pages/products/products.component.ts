import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { AnimationTypes, IApplicationCard, SidesX } from 'src/app/core';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    activeSlide: SidesX = 'left';
    loadedAppCards: IApplicationCard[] = [];
    appTotalCount: number = 0;
    pageIndex: number = 1;
    limit: number = 2;
    isLoading: boolean = false;

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this.productsService.getAllWebApplications().subscribe((apps) => (this.appTotalCount = apps.length));
        this.getPortionOfApps(this.pageIndex, this.limit);
    }

    get AnimationTypes() {
        return AnimationTypes;
    }
    public setActiveSlide(activeSlide: SidesX) {
        this.activeSlide = activeSlide;
    }
    public onPagination(e: PageEvent): void {
        this.getPortionOfApps(e.pageIndex + 1, e.pageSize);
    }
    private getPortionOfApps(pageIndex: number, limit: number = this.limit): void {
        this.isLoading = true;
        this.productsService.getPortionOfApps(pageIndex, limit).subscribe((apps) => {
            this.loadedAppCards = apps;
            this.isLoading = false;
        });
    }
}
