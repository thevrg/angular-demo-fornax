import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements OnInit {

  @Input()
  type: string;
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  form: FormGroup;
  @Input()
  options: Iterable<{label: string, value: any}>;

  private _formControl: FormControl;

  required: string|null;

  get formControl(): FormControl {
    return this._formControl;
  }

  constructor() { }

  ngOnInit() {
    this._formControl = this.form.controls[this.name] as FormControl;
    const origValue = this._formControl.value;
    this._formControl.setValue('');
    this.required = !this._formControl.valid ? 'required' : null;
    this._formControl.setValue(origValue);
  }

}
