import { Injectable } from '@angular/core';
import { Themes } from '../model';
import { colors } from '../constants';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    theme: Themes | null = null;

    changeTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', JSON.stringify(this.theme));
        this.setProperties(this.theme);
    }

    initTheme() {
        this.theme = JSON.parse(localStorage.getItem('theme') as Themes) ?? 'dark';
        this.setProperties(this.theme);
    }

    private setProperties(theme: Themes | null) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--primary-text-color', colors.white);
            root.style.setProperty('--secondary-text-color', colors.black);
            root.style.setProperty('--bg-color', colors.black);
            root.style.setProperty('--primary-rgba', colors.rgbaWhite03);
            root.style.setProperty('--secondary-rgba', colors.rgbaBlack08);
            root.style.setProperty('--vinous-blue-bg-color', colors.rgbaVinous07);
        } else {
            root.style.setProperty('--primary-text-color', colors.black);
            root.style.setProperty('--secondary-text-color', colors.white);
            root.style.setProperty('--bg-color', colors.white);
            root.style.setProperty('--primary-rgba', colors.rgbaBlack08);
            root.style.setProperty('--secondary-rgba', colors.rgbaWhite03);
            root.style.setProperty('--vinous-blue-bg-color', colors.rgbaBlue07);
        }
    }
}
