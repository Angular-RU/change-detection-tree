import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {Lifecycle} from "../../utils/Lifecycle";
import {TreeNode} from "../base.class";

@Lifecycle()
@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent extends TreeNode {
  constructor(context: Injector) {
    super(context);
  }
}
