import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.css'],
  template: `
    <div class="separator"></div>
    <div class="card light">
      <div class="card-header">
        <img class="logo" src="assets/img/logo/logo-white.svg" />
        <div class="header-text">
          Ta ditt första steg mot Thyroid wellness
        </div>
      </div>
      <p class="text-center">
        Lämna en intresseanmälan
      </p>
      <div class="form">
        <input type="text" placeholder="Din mailadress.." autocomplete="off" />
        <button class="send-btn" (click)="send()">Skicka intresseanmälan</button>
      </div>
      <p class="text-center" [class.hidden]="!sent">
        Intresseanmälan är inte öppen
      </p>
    </div>
  `
})
export class RegisterComponent {
  sent = false;

  send() {
    setTimeout(() => {
      this.sent = true;
    }, 1000)
    setTimeout(() => {
      this.sent = false;
    }, 4000)
  }
}
