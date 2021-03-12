import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress',
  styleUrls: ['./progress.component.css'],
  template: `
  <div class="back-row" *ngIf="progress > 95" (click)="goHome.emit()">
      <div class="swipe-indicator backward">
        &laquo;
      </div>
      Tillbaka till start
  </div>

  <div class="progress">
    <div class="row">
      Swipa / Scrolla för att utforska
      <div class="swipe-indicator forward">
        &raquo;
      </div>
    </div>

    <div class="progress-bar">
      <div class="progress-bar-fill" [style.width.%]="progress">
      </div>
    </div>

    <div class="row">
      Eller använd tangenterna
    </div>
  </div>
  `
})
export class ProgressComponent {
  @Input() progress = 0;
  @Output() goHome = new EventEmitter();
}
