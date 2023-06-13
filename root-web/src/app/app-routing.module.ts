import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { DeveloperComponent } from './pages/developer/developer.component';

const routes: Routes = [
    { path: '', component: HomepageComponent, title: 'Home' },
    { path: 'about', component: AboutComponent, title: 'About Us' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
    {
        path: 'developer',
        children: [
            {
                path: ':id',
                component: DeveloperComponent,
                title: 'Developers',
            },
        ],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
