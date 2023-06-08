import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AnimationTypes, IApplicationCard, IOption, SidesX, pageSizeOptions } from 'src/app/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { SelectComponent } from 'src/app/shared/components/select/select.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    activeSlide: SidesX = 'left';
    loadedWebCards: IApplicationCard[] = [];
    webTotalCount: number = 0;
    pageIndex: number = 1;
    limit: number = 2;
    isLoading: boolean = false;
    pageSizeOptions: IOption[] = pageSizeOptions;

    constructor(private productsService: ProductsService) {}
    @ViewChild(SelectComponent) select!: SelectComponent;
    @HostListener('click', ['$event']) onCloseSelect(e: Event) {
        !(e.target as HTMLElement).closest('.select-wrapper') && this.select.onClose();
    }

    ngOnInit(): void {
        this.productsService.getAllWebApplications().subscribe((apps) => (this.webTotalCount = apps.length));
        this.getPortionOfApps(this.pageIndex, this.limit);
    }

    get AnimationTypes() {
        return AnimationTypes;
    }
    public setActiveSlide(activeSlide: SidesX) {
        this.activeSlide = activeSlide;
    }
    public onPagination(pageIndex: number): void {
        this.pageIndex = pageIndex + 1;
        this.getPortionOfApps(this.pageIndex, this.limit);
    }
    public onPageSizeChange(limit: number | string) {
        this.limit = limit as number;
        this.getPortionOfApps(1, this.limit);
    }
    private getPortionOfApps(pageIndex: number, limit: number = this.limit): void {
        this.isLoading = true;
        this.productsService.getPortionOfApps(pageIndex, limit).subscribe((apps) => {
            this.loadedWebCards = apps;
            this.isLoading = false;
        });
    }
}
