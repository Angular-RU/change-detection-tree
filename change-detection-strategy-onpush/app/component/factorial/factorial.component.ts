import {ChangeDetectionStrategy, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import * as math from 'mathjs';

math.config({number: 'BigNumber', precision: 100});

@Component({
  selector: 'factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactorialComponent {
  public factorialValue = 10;
  private executeCount: number = 0;
  @ViewChild('total', {read: ElementRef}) private total: ElementRef;
  @ViewChild('execute', {read: ElementRef}) private execute: ElementRef;

  constructor(private ngZone: NgZone) {}

  public factorial(n) {
    this.executeCount++;
    const start = performance.now();
    const result = math.eval(`${n}!`).toString();
    const total = Math.ceil(performance.now() - start);

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.total) {
          this.total.nativeElement.setAttribute('data-total', total);
          this.execute.nativeElement.setAttribute('data-execute', this.executeCount);
        }
      }, 2000);
    });

    return result;
  }

}
