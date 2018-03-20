import {ChangeDetectionStrategy, Component, Injector, Input} from '@angular/core';
import {TreeNode} from '../../../common/tree-node.class';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'input-change',
  templateUrl: './input-change.component.html',
  styleUrls: ['./input-change.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputChangeComponent extends TreeNode {

  @Input() count$: BehaviorSubject<{ value: number }>;

  constructor(context: Injector) {
    super(context);
  }

  public addCount($event) {
    this.count$.next({ value: parseInt($event) || 0 });
  }

}
