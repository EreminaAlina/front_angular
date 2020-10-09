import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  checked: boolean= true;
  @Output() onChanged = new EventEmitter<boolean>();

  constructor(private router: Router, private themeSer: ThemeService, private userService: UserService) { }

  ngOnInit(): void {
    const activeTH = localStorage.getItem('theme');
    this.checked = activeTH === 'light';
    this.themeSer.setUserTheme(activeTH);
  }

  logOut(){
    localStorage.clear();
    return this.router.navigate(['/login'])
  }

  changeMod(change:boolean){
    this.checked ? this.themeSer.setLightTheme() : this.themeSer.setDarkTheme();
    this.userService.saveTheme(this.themeSer.active.name);
    localStorage.setItem('theme', this.themeSer.active.name)
  }
}
