import {Component, Injector} from '@angular/core';
import {Lifecycle} from "../../utils/Lifecycle";
import {TreeNode} from "../base.class";

@Lifecycle()
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent extends TreeNode {
  constructor(context: Injector) {
    super(context);
  }
}
