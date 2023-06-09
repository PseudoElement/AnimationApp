import { HeaderLink, ScrollPoints } from '../model';

export const links: HeaderLink[] = [
    {
        path: '/',
        text: 'Home',
    },
    {
        path: '/about',
        text: 'About',
    },
    {
        path: '/products',
        text: 'Products',
    },
    { path: '/chat', text: 'Chat' },
    { path: '/other', text: 'Other' },
];

export const scrollPoints: ScrollPoints = {
    useOpacityHeader: 50,
    showHide: 600,
};
