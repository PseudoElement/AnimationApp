export interface ISlide {
    offsetLeft: number;
    count: number;
    node: HTMLElement;
}
export type IAutoPlay = false | { delay: number; stopOnHover: boolean; disableOnInteraction: boolean };
