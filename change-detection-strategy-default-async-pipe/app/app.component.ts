import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {Lifecycle} from '../common/utils/Lifecycle';
import {TreeNode} from '../common/tree-node.class';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
@Lifecycle({defaultName: true})
export class AppComponent extends TreeNode {

  @ViewChild('tick', {read: ElementRef}) private tick: ElementRef;
  private countTick: number = 0;

  public countTree$ = new BehaviorSubject({ value: 0 });
  public cd: ChangeDetectorRef;
  private sub$: Subscription;
  private timer;

  constructor(context: Injector) {
    super(context);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.sub$ = this.countTree$.subscribe(() => {
      clearInterval(this.timer);
      this.timer = setTimeout(() => this.cd.detectChanges(), 150);
    });
  }


  public ngAfterViewChecked() {
    this.countTick++;
    super.ngAfterViewChecked();
    if (this.tick) {
      this.tick.nativeElement.setAttribute('data-tick-count', this.countTick);
    }
  }

}
