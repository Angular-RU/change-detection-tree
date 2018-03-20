import {ChangeDetectionStrategy, Component, Injector, Input} from '@angular/core';
import {Lifecycle} from "../../../common/utils/Lifecycle";
import {TreeNode} from "../../../common/tree-node.class";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface Limit {
  deep: number;
  limitComponents?: ListRandomComponentTreeCount;
}

interface ListRandomComponentTreeCount {
  button: number;
  input: number;
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

  @Input() count$: BehaviorSubject<{ value: number }>;
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

  public limitCount: ListRandomComponentTreeCount = {
    button: Infinity,
    input: Infinity
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

    if (this.limit.limitComponents) {
      this.limitCount = JSON.parse(JSON.stringify(this.limit.limitComponents));
    }

    this.updateEvaluateComponent();
  }

  private updateEvaluateComponent() {
    for (let option in this.evaluateComponent) {
      const randomValue = this.random();

      if (this.evaluateComponent[option] === null && this.limitEvaluate > 0 && randomValue) {

        let showInView = false;
        let limitOption = this.limit.limitComponents && this.limit.limitComponents[option];
        if (limitOption !== undefined && limitOption > 0) {
          this.limit.limitComponents[option]--;
          showInView = true;
        } else if (limitOption === undefined) {
          limitOption = Infinity;
          showInView = true;
        }

        if (showInView) {
          console.log("limitOption", limitOption, "option", option)
          this.evaluateComponent[option] = randomValue;
          this.limitEvaluate--;
        }

      }
    }
  }

  private random() {
    return (function() {
      const a = new Uint8Array(1);
      return function() {
        crypto.getRandomValues(a);
        return a[0] > 127 && Math.random() >= 0.5;
      };
    })()();
  }

}
