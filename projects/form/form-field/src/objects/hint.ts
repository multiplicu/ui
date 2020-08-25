import { Directive, HostBinding, Input } from '@angular/core';

let nextUniqueId = 0;

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[xcu-hint]',
  host: {
    class: 'xcu-hint',
  },
})
export class XcuHint {
  /** Whether to align the hint label at the start or end of the line. */
  @HostBinding('attr.align')
  @Input()
  align: 'start' | 'end' = 'start';

  /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
  @HostBinding('attr.id')
  @Input()
  public id: string = `xcu-hint-${nextUniqueId++}`;

  public constructor() {}
}
