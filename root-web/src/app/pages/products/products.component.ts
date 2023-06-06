import { Component } from '@angular/core';
import { AnimationTypes, SidesX } from 'src/app/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
    activeSlide: SidesX = 'right';
    get AnimationTypes() {
        return AnimationTypes;
    }
    public setActiveSlide(activeSlide: SidesX) {
        this.activeSlide = activeSlide;
    }
}
