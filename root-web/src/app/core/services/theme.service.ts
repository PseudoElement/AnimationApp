import { Injectable } from '@angular/core';
import { Themes } from '../model';

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
        console.log(this.theme);
        this.setProperties(this.theme);
    }

    private setProperties(theme: Themes | null) {
        const root = document.documentElement;
        console.log(theme);
        if (theme === 'dark') {
            root.style.setProperty('--text-color', '#fff');
            root.style.setProperty('--bg-color', '#000');
            root.style.setProperty('--primary-rgba', 'rgba(255, 255, 255, 0.3)');
            root.style.setProperty('--secondary-rgba', 'rgba(0, 0, 0, 0.2)');
        } else {
            root.style.setProperty('--text-color', '#000');
            root.style.setProperty('--bg-color', '#fff');
            root.style.setProperty('--primary-rgba', 'rgba(0, 0, 0, 0.2)');
            root.style.setProperty('--secondary-rgba', 'rgba(255, 255, 255, 0.3)');
        }
    }
}
