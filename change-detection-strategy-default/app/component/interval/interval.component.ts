import {Component, Injector, Input} from '@angular/core';
import {interval} from 'rxjs/observable/interval';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {TreeNode} from '../../../../common/tree-node.class';
import {Lifecycle} from '../../../../common/utils/Lifecycle';

@Component({
  selector: 'interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
@Lifecycle({defaultName: true})
export class IntervalComponent extends TreeNode {
  @Input() public runOutside: string;
  @Input() public setInterval: string;
  @Input() public asyncPipe: string;
  public enabled: boolean;
  public formatDate: string;
  public timerSub: Subscription;
  public timerObservable: Observable<string>;
  public timer: number;

  constructor(context: Injector) {
    super(context);
    this.formatDate = this.getFormattedDate();
  }

  public enableInterval() {
    if (this.setInterval) {
      this.timerInterval();
    } else if (this.runOutside) {
      this.zone.runOutsideAngular(() => {
        const timer = interval(1000).pipe(map(this.getFormattedDate));
        this.timerSub = timer.subscribe((time) => {
          this.formatDate = time;
          this.cd.detectChanges();
        });
      });
    } else {
      this.zone.runOutsideAngular(() => { // but async pipe execute main zone
        this.timerObservable = interval(1000).pipe(map(this.getFormattedDate));
      });
    }
  }

  public updateInterval(enable: boolean) {
    if (enable) {
      this.enableInterval();
    } else {
      if (this.timerSub) {
        this.timerSub.unsubscribe();
      }
      this.timerObservable = null;
      clearInterval(this.timer);
    }
  }

  private timerInterval() {
    this.timer = window.setInterval(() => {
      this.formatDate = this.getFormattedDate();
    }, 1000);
  }

  private getFormattedDate() {
    return new Date().toJSON().substring(10, 19).replace('T', '');
  }

}
