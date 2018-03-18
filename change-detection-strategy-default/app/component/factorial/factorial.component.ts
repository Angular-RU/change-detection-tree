import {Component, ElementRef, ViewChild} from '@angular/core';
import * as math from 'mathjs';

math.config({number: 'BigNumber', precision: 100});

@Component({
  selector: 'factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.css']
})
export class FactorialComponent {
  public enabled = true;
  public factorialValue = 10;
  @ViewChild('total', {read: ElementRef}) private total: ElementRef;

  public factorial(n) {
    const start = performance.now();
    const result = math.eval(`${n}!`).toString();
    const total = Math.ceil(performance.now() - start);

    if (this.total) {
      this.total.nativeElement.setAttribute('data-total', total);
    }

    return result;
  }

}
