import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
export class IntervalComponent implements OnInit, OnDestroy {
  private timer;
  constructor(private ngZone: NgZone) {}
  public ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => console.log('interval'), 1000);
    });
  }
  public ngOnDestroy() {
    clearInterval(this.timer);
  }
}

