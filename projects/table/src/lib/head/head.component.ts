import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'xcu-head, th, th[xcu-head], div[xcu-head]',
  exportAs: 'xcuTableHead',
  host: {
    class: 'table-head typography',
    role: 'columnheader',
  },
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuHeadComponent {
  @HostBinding('style.text-align')
  @Input()
  public justify: 'start' | 'end' = 'start';

  public constructor() {}
}
