import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { HeaderComponent, MenuComponent, ProgressComponent } from './components';



@NgModule({
  declarations: [NavigationComponent, HeaderComponent, ProgressComponent, MenuComponent],
  imports: [
    CommonModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
