import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'comp-ext',
  templateUrl: './comp-ext.component.html',
  styleUrls: ['./comp-ext.component.css']
})
export class CompExtComponent implements OnInit {

  @Input() inpValue: string;
  @Output() outAct = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  outAction() {
    this.outAct.emit('hello');
  }

}
