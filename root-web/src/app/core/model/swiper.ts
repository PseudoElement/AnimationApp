export type SlideChangeEffects = 'cards' | 'flip' | 'coverflow' | 'slide' | 'cube';
export interface ITableData {
    tableHeaders: string[];
    tableRows: Array<string[]>;
}

interface IAutoplay {
    delay: number;
    pauseOnMouseEnter: boolean;
    disableOnInteraction: boolean;
}

export interface ISwiperOptions {
    slidesPerView: number;
    autoplay: boolean | IAutoplay;
    loop: boolean;
    navigation: boolean;
    effect: SlideChangeEffects;
    pagination: boolean;
    enabled: boolean;
    grabCursor: boolean;
    speed: number;
    simulateTouch: boolean;
}
