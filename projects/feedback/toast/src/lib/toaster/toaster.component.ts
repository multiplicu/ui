import { Component } from '@angular/core';

@Component({
  selector: 'xcu-toaster, [xcu-toaster]',
  host: {
    class: 'xcu-toaster',
  },
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent {
  public constructor() {}
}
