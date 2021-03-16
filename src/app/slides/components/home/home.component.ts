import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  template: `
  <div class="card">
    <h4 class="header">
        Välkommen till 
        <span class="accent">Boostly</span>
    </h4>

    <p class="text">
        {{filler}}
    </p>

    <button class="register-btn" (click)="registerClick.emit()">
        Intresseanmälan
    </button>
  </div>
`
})
export class HomeComponent {
  @Input() filler = "";
  @Output() registerClick = new EventEmitter();
}
