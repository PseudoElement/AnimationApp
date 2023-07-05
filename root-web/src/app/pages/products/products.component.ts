import { Component, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { zoomInOnEnterAnimation } from 'angular-animations';
import { AnimationTypes, IApplicationCard, IGameCard, IOption, SidesX, pageSizeOptions } from 'src/app/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { SelectComponent } from 'src/app/shared/components/select/select.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [zoomInOnEnterAnimation()],
})
export class ProductsComponent {
    activeSlide: SidesX = 'left';
    loadedWebCards: IApplicationCard[] = [];
    loadedGamesCard: IGameCard[] = [];
    webTotalCount: number = 0;
    gamesTotalCount: number = 0;
    pageIndexApps: number = 1;
    pageIndexGames: number = 1;
    limitApps: number = 2;
    limitGames: number = 2;
    pageSizeOptions: IOption[] = pageSizeOptions;
    constructor(private productsService: ProductsService) {
        this.productsService.getAllWebApplications().subscribe((apps) => (this.webTotalCount = apps.length));
        this.productsService.getAllGames().subscribe((games) => (this.gamesTotalCount = games.length));
        this._getPortionOfApps(this.pageIndexApps, this.limitApps);
        this._getPortionOfGames(this.pageIndexGames, this.limitGames);
    }
    @ViewChildren(SelectComponent) selects!: QueryList<SelectComponent>;
    @HostListener('click', ['$event']) onCloseSelect(e: Event) {
        this.selects.forEach((select) => !(e.target as HTMLElement).closest('.select-wrapper') && select.onClose());
    }

    get AnimationTypes() {
        return AnimationTypes;
    }
    public setActiveSlide(activeSlide: SidesX) {
        this.activeSlide = activeSlide;
    }
    public onPagination(pageIndex: number, slide: 'apps' | 'games'): void {
        if (slide === 'apps') {
            this.pageIndexApps = pageIndex + 1;
            this._getPortionOfApps(this.pageIndexApps, this.limitApps);
        } else {
            this.pageIndexGames = pageIndex + 1;
            this._getPortionOfGames(this.pageIndexGames, this.limitGames);
        }
    }

    public onPageSizeChange(limit: number | string, slide: 'apps' | 'games') {
        if (slide === 'apps') {
            this.pageIndexApps = 1;
            this.limitApps = limit as number;
            this._getPortionOfApps(this.pageIndexApps, this.limitApps);
        } else {
            this.limitGames = limit as number;
            this.pageIndexGames = 1;
            this._getPortionOfGames(this.pageIndexGames, this.limitGames);
        }
    }

    private _getPortionOfApps(pageIndex: number, limit: number = this.limitApps): void {
        this.productsService.getPortionOfApps(pageIndex, limit).subscribe((apps) => {
            this.loadedWebCards = apps;
        });
    }

    private _getPortionOfGames(pageIndex: number, limit: number = this.limitGames): void {
        this.productsService.getPortionOfGames(pageIndex, limit).subscribe((games) => {
            this.loadedGamesCard = games;
        });
    }
}
