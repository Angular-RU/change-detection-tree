import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {Lifecycle} from "./utils/Lifecycle";
import {TreeNode} from "./tree/base.class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Lifecycle({ defaultName: true })
export class AppComponent extends TreeNode {
  countTree = { value: 0 };
  constructor(context: Injector) {
    super(context);
  }
}
