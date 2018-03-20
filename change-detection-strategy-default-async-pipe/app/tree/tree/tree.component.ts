import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {Lifecycle} from "../../../common/utils/Lifecycle";
import {TreeNode} from "../../../common/tree-node.class";

@Lifecycle()
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TreeComponent extends TreeNode {
  constructor(context: Injector) {
    super(context);
  }
}
