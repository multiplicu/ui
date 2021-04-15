import {
  AfterViewInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { XcuToastComponent } from './../toast.component';

@Component({
  selector: 'xcu-toaster, [xcu-toaster]',
  host: {
    class: 'xcu-toaster',
  },
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class XcuToasterComponent implements AfterViewInit {
  @ContentChildren(XcuToastComponent, { descendants: true })
  public toasts: QueryList<XcuToastComponent> = new QueryList<XcuToastComponent>();

  public constructor() {}

  public ngAfterViewInit(): void {
    this.toasts.forEach(
      (toast: XcuToastComponent) => {}
      // toast.afterDismissed.subscribe(() => {
      //   console.log('kill', toast);
      // })
    );
  }
}
