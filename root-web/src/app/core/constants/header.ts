import { HeaderLink, ScrollPoints } from '../model';

export const links: HeaderLink[] = [
    {
        path: '/',
        text: 'Home',
    },
    {
        path: '/products',
        text: 'Products',
    },

    {
        path: '/about',
        text: 'About',
    },
];

export const scrollPoints: ScrollPoints = {
    useOpacityHeader: 50,
    showHide: 600,
};
