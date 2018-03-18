import {Component, Injector, Input} from '@angular/core';
import {TreeNode} from '../../tree/base.class';

@Component({
  selector: 'input-change',
  templateUrl: './input-change.component.html',
  styleUrls: ['./input-change.component.css']
})
export class InputChangeComponent extends TreeNode {

  @Input() count: { value: number };

  constructor(context: Injector) {
    super(context);
  }

}
