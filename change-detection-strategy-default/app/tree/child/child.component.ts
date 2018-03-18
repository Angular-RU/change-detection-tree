import {Component, Injector} from '@angular/core';
import {Lifecycle} from "../../../../common/utils/Lifecycle";
import {TreeNode} from "../../../../common/tree-node.class";

@Lifecycle()
@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent extends TreeNode {
  constructor(context: Injector) {
    super(context);
  }
}
