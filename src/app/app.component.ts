import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: 'FRUIT', useValue: 'AppComponent' }]
})
export class AppComponent {
  title = 'app works!';
}
