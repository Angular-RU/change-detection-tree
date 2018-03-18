import {ChangeDetectionStrategy, Component, Injector, Input} from '@angular/core';
import {Lifecycle} from "../../..//common/utils/Lifecycle";
import {TreeNode} from "../../..//common/tree-node.class";

interface Limit {
  deep: number;
}

interface ListRandomComponentTree {
  button: boolean;
  input: boolean;
  factorial: boolean;
  runOutside: boolean;
  setInterval: boolean;
  asyncPipe: boolean;
}

@Lifecycle()
@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent extends TreeNode {

  @Input() count: { value: number };
  @Input() public limit: Partial<Limit> = {};
  public limitEvaluate: number = 1;
  public countList: number[] = [];
  public savedItems: boolean;

  public evaluateComponent: ListRandomComponentTree = {
    button: null,
    input: null,
    factorial: null,
    runOutside: null,
    setInterval: null,
    asyncPipe: null
  };

  constructor(context: Injector) {
    super(context);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.limit.deep--;
    this.savedItems = true;

    const deep = this.limit.deep;
    const length = Math.ceil(Math.random() * (deep)) + 1;
    if (length > 0) {
      this.countList = Array(length).fill(0);
    }

    this.updateEvaluateComponent();
  }

  private updateEvaluateComponent() {
    for (let option in this.evaluateComponent) {
      const randomValue = this.random();
      if (this.evaluateComponent[option] === null && this.limitEvaluate > 0 && randomValue) {
        this.evaluateComponent[option] = randomValue;
        this.limitEvaluate--;
      }
    }
  }

  private random() {
    return (function() {
      const a = new Uint8Array(1);
      return function() {
        crypto.getRandomValues(a);
        return a[0] > 127;
      };
    })()();
  }

}
