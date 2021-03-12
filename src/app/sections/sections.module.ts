import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from './sections.component';
import { AboutUsComponent, HomeComponent, RecipesComponent, RegisterComponent, WellnessComponent } from './components';
;

@NgModule({
  declarations: [SectionsComponent, HomeComponent, RegisterComponent, AboutUsComponent, WellnessComponent, RecipesComponent],
  imports: [
    CommonModule
  ],
  exports: [SectionsComponent],
})
export class SectionsModule { }
