import { RegisterComponent } from './components/';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides.component';

@NgModule({
  declarations: [SlidesComponent, RegisterComponent],
  imports: [
    CommonModule
  ],
  exports: [SlidesComponent],
})
export class SlidesModule { }
