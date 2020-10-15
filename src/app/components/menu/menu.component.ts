import {Component, EventEmitter, Input, Output} from "@angular/core";

import {Theme} from "../../interfaces/Theme.interface";
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
    @Input() options: Array<Theme>;
    @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private themeSer: ThemeService) {
    }


    changeTheme(themeToSet) {
        this.themeChange.emit(themeToSet);
        this.options.forEach(opt => {
          opt.value === themeToSet ? opt.checked = true : opt.checked =  false;
        })
        console.log(this.options);
    }
}
