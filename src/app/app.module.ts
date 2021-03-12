import { NavigationModule } from './navigation/navigation.module';
import { SectionsModule } from './sections/sections.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SectionsModule,
    NavigationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
