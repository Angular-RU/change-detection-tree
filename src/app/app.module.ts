import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TreeComponent} from './tree/tree/tree.component';
import {ChildComponent} from './tree/child/child.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";


@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
