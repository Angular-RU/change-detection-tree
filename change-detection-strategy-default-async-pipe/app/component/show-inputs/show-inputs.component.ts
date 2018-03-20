import {ChangeDetectionStrategy, Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'show-inputs',
  templateUrl: './show-inputs.component.html',
  styleUrls: ['./show-inputs.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ShowInputsComponent {
  @Input() public changes: SimpleChanges;

  public keys(val) {
    return Object.keys(val);
  }
}
