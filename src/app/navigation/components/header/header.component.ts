import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  template: `
  <div class="hamburger" (click)="toggleMenu.emit()">
    <div class="lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
    <p class="hamburger-text">Meny</p>
  </div>

  <div class="brand">
      <img src="/assets/img/logo/logo.svg" alt="" class="logo" />
      <h4 class="brand-name">Boostly</h4>
  </div>
  `
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter();
}
