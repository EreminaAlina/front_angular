import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Theme, light, dark} from '../interfaces/Theme.interface';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    themes = [light, dark];
    active: Theme;

    constructor() {
    }

    setDefaultTheme() {
        this.setActiveTheme(light);
    }

    setDarkTheme(): void {
        this.setActiveTheme(dark);
    }

    setLightTheme(): void {
        this.setActiveTheme(light);
    }

    setActiveTheme(theme: Theme): void {
        if (!theme) {
            theme = this.themes[0];
        }
        this.active = theme;

        Object.keys(this.active.properties).forEach(property => {
            document.documentElement.style.setProperty(
                property,
                this.active.properties[property]
            );
        });
    }

    setUserTheme(themeName: string) { // 'light'
        const theme = this.themes.filter(th => th.name === themeName)[0];
        this.setActiveTheme(theme);

    }

    getActiveTheme() {
        return this.active.name;
    }


}
