import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {Lifecycle} from '../../common/utils/Lifecycle';
import {TreeNode} from '../../common/tree-node.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Lifecycle({defaultName: true})
export class AppComponent extends TreeNode {

  @ViewChild('tick', {read: ElementRef}) private tick: ElementRef;
  public countTree = {value: 0};
  private countTick: number = 0;

  constructor(context: Injector) {
    super(context);
  }

  public ngAfterViewChecked() {
    this.countTick++;
    super.ngAfterViewChecked();
    if (this.tick) {
      this.tick.nativeElement.setAttribute('data-tick-count', this.countTick);
    }
  }

}
