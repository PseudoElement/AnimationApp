export type DirectionsX = 'rtl' | 'ltr';
export type Directions = 'vertical' | 'horizontal';
export type ButtonClassNames = 'withArrow-btn' | 'theme-btn' | 'close-btn' | 'borderRadius0' | 'send-btn' | '';
export type SidesX = 'left' | 'right';
export interface IOption {
    value: string | number;
    text: string;
}

export interface IRadioInput {
    value: string | number;
    name: string;
    id: number | string;
    label: string;
}
