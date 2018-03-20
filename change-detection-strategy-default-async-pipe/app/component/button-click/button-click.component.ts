import {ChangeDetectionStrategy, Component, Injector, Input} from '@angular/core';
import {Lifecycle} from "../../../common/utils/Lifecycle";
import {TreeNode} from "../../../common/tree-node.class";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'button-click',
  templateUrl: './button-click.component.html',
  styleUrls: ['./button-click.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
@Lifecycle({defaultName: true})
export class ButtonClickComponent extends TreeNode {

  @Input() count$: BehaviorSubject<{ value: number }>;

  constructor(context: Injector) {
    super(context);
  }

  public addCount() {
    let countValue: number = (this.count$.getValue()).value;
    this.count$.next({ value: ++countValue });
  }

}
