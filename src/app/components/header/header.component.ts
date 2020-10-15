import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import {Theme} from "../../interfaces/Theme.interface";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    checked: boolean = true;
    options$: Observable<Array<Theme>>;

    constructor(private router: Router, private themeSer: ThemeService, private userService: UserService) {
    }

    ngOnInit(): void {
        const activeTH = localStorage.getItem('theme');
        this.themeSer.setTheme(activeTH);

        // this.checked = activeTH === 'light';
        this.options$ = this.themeSer.getThemeOptions();

    }

    themeChangeHandler(themeToSet) {
        this.themeSer.setTheme(themeToSet);
        this.userService.saveTheme(themeToSet);
        localStorage.setItem('theme', themeToSet)
    }

    logOut() {
        localStorage.clear();
        return this.router.navigate(['/login'])
    }

    startChat() {
        return this.router.navigate(['/chat'])
    }

    // changeMod(change:boolean){
    //   this.checked ? this.themeSer.setLightTheme() : this.themeSer.setDarkTheme();
    //   this.userService.saveTheme(this.themeSer.active.name);
    //   localStorage.setItem('theme', this.themeSer.active.name)
    // }
}
