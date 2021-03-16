import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  styleUrls: ["./register.component.scss"],
  template: `
  <div id="register">
    <div class="card light center">
      <div class="card-header font-lobster">

          <img src="assets/img/logo/logo-white.svg" class="register-logo" />

          <h4 class="font-lobster">
              Ta ditt första steg mot
              <div>
                  Thyroid Wellness
              </div>
          </h4>
      </div>

      <p class="text-bold m-2 mb-1">Lämna en intresseanmälan</p>

      <div class="card-body form">
          <input type="text" class="text-input" placeholder="Din mailadress.." />
          <button class="btn btn-async" (click)="send()">Skicka intresseanmälan</button>
      </div>

      <p [class.hidden]="!sent" class="sent-text text-bold" style="margin-top: 1rem">Intresseanmälan är inte öppen</p>
    </div>
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
