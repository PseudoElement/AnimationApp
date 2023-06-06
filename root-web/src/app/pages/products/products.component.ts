import { Component, OnInit } from '@angular/core';
import { AnimationTypes, IApplicationCard, SidesX } from 'src/app/core';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    activeSlide: SidesX = 'right';
    applications: IApplicationCard[] = [];

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this.productsService.getWebApplications().subscribe((apps) => (this.applications = apps));
    }

    get AnimationTypes() {
        return AnimationTypes;
    }
    public setActiveSlide(activeSlide: SidesX) {
        this.activeSlide = activeSlide;
    }
}
