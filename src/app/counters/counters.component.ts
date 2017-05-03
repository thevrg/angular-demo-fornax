import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  @Input()
  redCounter: number;

  @Input()
  blueCounter: number;

  @Input()
  greenCounter: number;

  constructor() {
    this.redCounter = 100;
    this.blueCounter = 200;
    this.greenCounter = 300;
  }

  ngOnInit() {
  }

}
