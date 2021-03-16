import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <app-navigation></app-navigation>
  <app-slides></app-slides>
  `
})
export class AppComponent {
  title = 'boostly';
}
