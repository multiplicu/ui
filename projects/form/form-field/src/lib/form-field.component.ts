import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'xcu-form-field, div[xcu-form-field]',
  exportAs: 'xcuFormField',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class XcuFormFieldComponent {
  public constructor(public elementRef: ElementRef) {}
}
