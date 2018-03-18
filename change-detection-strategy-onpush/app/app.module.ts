import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {TreeComponent} from './tree/tree/tree.component';
import {ChildComponent} from './tree/child/child.component';
import {ButtonClickComponent} from './component/button-click/button-click.component';
import {FormsModule} from '@angular/forms';
import {InputChangeComponent} from './component/input-change/input-change.component';
import { ShowInputsComponent } from './component/show-inputs/show-inputs.component';
import { IntervalComponent } from './component/interval/interval.component';
import { FactorialComponent } from './component/factorial/factorial.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    ChildComponent,
    ButtonClickComponent,
    InputChangeComponent,
    ShowInputsComponent,
    IntervalComponent,
    FactorialComponent,
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
