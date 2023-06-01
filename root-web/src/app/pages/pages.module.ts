import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { DeveloperComponent } from './developer/developer.component';

@NgModule({
    declarations: [HomepageComponent, AboutComponent, ProductsComponent, DeveloperComponent],
    imports: [CommonModule, SharedModule],
    exports: [HomepageComponent, AboutComponent, ProductsComponent, DeveloperComponent],
})
export class PagesModule {}
