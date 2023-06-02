import { Component } from '@angular/core';
import { AnimationTypes } from 'src/app/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
    get AnimationTypes() {
        return AnimationTypes;
    }
}
