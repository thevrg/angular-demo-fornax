import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnChanges {

  private _counterValue: number;

  @Input()
  color: string;

  @Input()
  set counterValue(newCounterValue: number) {
    console.log('setting counter value to ' + newCounterValue);
    console.log('  typeof original ' + typeof newCounterValue);
    this._counterValue = Number(newCounterValue);
    console.log('  typeof converted ' + typeof this._counterValue);
  }

  get counterValue() {
    console.log('getting counterValue');
    return this._counterValue;
  }

  constructor() {
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges' + JSON.stringify(changes));
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  increase(): void {
    console.log('increase');
    this._counterValue++;
  }

  decrease(): void {
    console.log('decrease');
    this._counterValue--;
  }

}
