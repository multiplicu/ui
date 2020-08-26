import { Directive, HostBinding, Input, InjectionToken } from '@angular/core';

let nextUniqueId: number = 0;

/**
 * Injection token that can be used to reference instances of `XcuHint`. It serves as
 * alternative token to the actual `XcuHint` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `XcuHint` and we want to reduce breaking changes.
 */
export const _XCU_HINT = new InjectionToken<XcuHint>('XcuHint');

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[xcu-hint]',
  host: {
    class: 'xcu-hint',
    '[attr.id]': 'id',
  },
  providers: [{ provide: _XCU_HINT, useExisting: XcuHint }],
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
}
