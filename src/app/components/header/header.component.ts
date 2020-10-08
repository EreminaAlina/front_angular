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
  }

  logOut(){
    localStorage.clear();
    return this.router.navigate(['/login'])
  }
  changeMod(){

  }
}
