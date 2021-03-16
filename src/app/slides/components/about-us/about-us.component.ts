import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-us',
  styleUrls: ['./about-us.component.css'],
  template: `
  <div class="card">
    <h4 class="card-header">Om oss</h4>
    <p class="card-text">
        {{filler}}
    </p>
  </div>
  `
})
export class AboutUsComponent {
  @Input() filler = ""
}
