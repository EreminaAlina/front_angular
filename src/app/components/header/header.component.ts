import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  checked: boolean= true;

  constructor(private router: Router) { }

  ngOnInit(): void {
      document.documentElement.style.setProperty('--primary-colorr', this.checked ? 'grey' : 'white');
      document.documentElement.style.setProperty('--secondary-colorr', this.checked ? 'white' : 'grey');
  }

  logOut(){
    localStorage.clear();
    return this.router.navigate(['/login'])
  }
  changeMod(){
      document.documentElement.style.setProperty('--primary-colorr', this.checked ? 'grey' : 'white');
      document.documentElement.style.setProperty('--secondary-colorr', this.checked ? 'white' : 'grey');
  }
}
