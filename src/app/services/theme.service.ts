import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theme} from "../interfaces/Theme.interface";
import {StyleManagerService} from "./style-manager.service";

// import {Theme, light, dark} from '../interfaces/Theme.interface';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    // themes = [light, dark];
    // active: Theme;

    constructor(
        private http: HttpClient,
        private styleManager: StyleManagerService,
    ) {
    }

    getThemeOptions(): Observable<Array<Theme>> {
        return this.http.get<Array<Theme>>("assets/options.json")
    }

    setTheme(themeToSet) {
        this.styleManager.setStyle(
            "theme",
            `assets/prebuilt-themes/${themeToSet}.css`);
    }

    // setDefaultTheme() {
    //     this.setActiveTheme(light);
    // }
    //
    // setDarkTheme(): void {
    //     this.setActiveTheme(dark);
    // }
    //
    // setLightTheme(): void {
    //     this.setActiveTheme(light);
    // }
    //
    // setActiveTheme(theme: Theme): void {
    //     if (!theme) {
    //         theme = this.themes[0];
    //     }
    //     this.active = theme;
    //
    //     Object.keys(this.active.properties).forEach(property => {
    //         document.documentElement.style.setProperty(
    //             property,
    //             this.active.properties[property]
    //         );
    //     });
    // }
    //
    // setUserTheme(themeName: string) { // 'light'
    //     const theme = this.themes.filter(th => th.name === themeName)[0];
    //     this.setActiveTheme(theme);
    //
    // }
    //
    // getActiveTheme() {
    //     return this.active.name;
    // }


}
