import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TreeComponent} from './tree/tree/tree.component';
import {ChildComponent} from './tree/child/child.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import { IntervalComponent } from './component/interval/interval.component';
import { ButtonClickComponent } from './component/button-click/button-click.component';
import {FormsModule} from "@angular/forms";
import { InputChangeComponent } from './component/input-change/input-change.component';


@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    ChildComponent,
    IntervalComponent,
    ButtonClickComponent,
    InputChangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
