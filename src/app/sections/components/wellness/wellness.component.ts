import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wellness',
  styleUrls: ['./wellness.component.css'],
  template: `
  <div class="card">
    <h4 class="card-header">Wellness</h4>
    <p class="card-text">
    {{filler}}
    </p>
  </div>
  `
})
export class WellnessComponent {
  @Input() filler = "";
}
