import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../interfaces/User.interface";

@Component({
  selector: 'to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

}
