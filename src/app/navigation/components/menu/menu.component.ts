import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  styleUrls: ['./menu.component.css'],
  template: `
    <div class="menu-header">
        <div class="brand">
            Boostly
        </div>
        <div class="close-menu" (click)="toggleMenu.emit()">
            &#10006;
        </div>
    </div>
    <ul class="menu-items">
        <li class="menu-item" [class.active]="activeSection === 0" (click)="goTo.emit(0)">Hem</li>
        <li class="menu-item" [class.active]="activeSection === 1" (click)="goTo.emit(1)">Wellness</li>
        <li class="menu-item" [class.active]="activeSection === 2" (click)="goTo.emit(2)">Recept</li>
        <li class="menu-item" [class.active]="activeSection === 3" (click)="goTo.emit(3)">Om oss</li>
    </ul>
    <button class="register-item" [class.active]="activeSection === 4" (click)="goTo.emit(4)">Intresseanmälan</button>
  `
})
export class MenuComponent {
  @Input() activeSection = 0;
  @Output() toggleMenu = new EventEmitter();
  @Output() goTo = new EventEmitter<number>();
}

