import { Directive, InjectionToken, Input } from '@angular/core';

let nextUniqueId: number = 0;

/**
 * Injection token that can be used to reference instances of `XcuError`. It serves as
 * alternative token to the actual `XcuError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const XCU_ERROR = new InjectionToken<XcuError>('XcuError');

/** Single error message to be shown underneath the form field. */
@Directive({
  selector: '[xcu-error]',
  host: {
    class: 'xcu-error',
    role: 'alert',
    '[attr.id]': 'id',
  },
  providers: [{ provide: XCU_ERROR, useExisting: XcuError }],
})
export class XcuError {
  @Input()
  public id: string = `xcu-error-${nextUniqueId++}`;
}
