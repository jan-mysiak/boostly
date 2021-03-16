import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipes',
  styleUrls: ['./recipes.component.css'],
  template: `
  <div class="overlay"></div>
  <div class="card light">
    <h4 class="card-header">Receptbanken</h4>
    <p class="card-text">
        {{filler}}
    </p>
  </div>
  `
})
export class RecipesComponent {
  @Input() filler = ""
}
