import { Directive, InjectionToken } from '@angular/core';

/**
 * Injection token that can be used to reference instances of `XcuPrefix`. It serves as
 * alternative token to the actual `XcuPrefix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `XcuPrefix` and we want to reduce breaking changes.
 */
export const _XCU_PREFIX = new InjectionToken<XcuPrefix>('XcuPrefix');

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[xcu-prefix]',
  providers: [{ provide: _XCU_PREFIX, useExisting: XcuPrefix }],
})
export class XcuPrefix {}
