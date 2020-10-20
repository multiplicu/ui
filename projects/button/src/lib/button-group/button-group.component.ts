import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'xcu-button-group, [xcu-button-group]',
  exportAs: 'xcuButtonGroup',
  host: {
    class: 'xcu-button-group',
  },
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class XcuButtonGroupComponent {
  public constructor() {}
}
