import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassDirective } from './class.directive';
import { BackgroundDirective } from './background.directive';
import { TimesDirective } from './times.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClassDirective,
    BackgroundDirective,
    TimesDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
