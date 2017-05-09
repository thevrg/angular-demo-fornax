import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  changeCounter = 0;

  @Input()
  redCounter: number;

  @Input()
  blueCounter: number;

  @Input()
  greenCounter: number;

  counters: { color: string, value: number }[];

  params: { red: number, green: number, blue: number };

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.redCounter = 100;
    this.blueCounter = 200;
    this.greenCounter = 300;
    this.counters = [{ color: 'purple', value: 19 },
    { color: 'lightblue', value: 29 },
    { color: 'navy', value: 39 }];
    this.activatedRoute.params.subscribe(this.onParamsChanging.bind(this));
  }

  ngOnInit() {
    this.redCounter = Number(this.redCounter);
  }

  onParamsChanging(params: { red: number, green: number, blue: number }) {
    this.params = params;
    if (this.params.red) {
      this.redCounter = this.params.red;
    }
    if (this.params.green) {
      this.greenCounter = this.params.green;
    }
    if (this.params.blue) {
      this.blueCounter = this.params.blue;
    }
  }

  redCounterChanged(counter: number) {
    this.redCounter = counter;
    console.log('navigation: ' + counter);
    this.router.navigate(['counters', this.redCounter, this.greenCounter, this.blueCounter], { queryParams: {red: this.redCounter }});
  }

  greenCounterChanged(counter: number) {
    this.greenCounter = counter;
    this.router.navigate(['counters', this.redCounter, this.greenCounter, this.blueCounter]);
  }

  blueCounterChanged(counter: number) {
    this.blueCounter = counter;
    this.router.navigate(['counters', this.redCounter, this.greenCounter, this.blueCounter]);
  }


  counterChanged(counter: number) {
    this.changeCounter++;
  }

}
