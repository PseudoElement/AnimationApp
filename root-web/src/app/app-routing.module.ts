import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { DeveloperComponent } from './pages/developer/developer.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { authGuard, beforeChatLeavingGuard } from './core';
import { OtherComponent } from './pages/other/other.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

const routes: Routes = [
    { path: '', component: HomepageComponent, title: 'Home' },
    { path: 'about', component: AboutComponent, title: 'About Us' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
    {
        path: 'chat',
        component: ChatPageComponent,
        title: 'Chat',
        canActivate: [authGuard],
        canDeactivate: [beforeChatLeavingGuard],
    },
    { path: 'other', component: OtherComponent, title: 'Other' },
    { path: 'my-account', component: MyAccountComponent },
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
