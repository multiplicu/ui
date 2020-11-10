import { Directive, InjectionToken } from '@angular/core';

/**
 * Injection token that can be used to reference instances of `XcuSuffix`. It serves as
 * alternative token to the actual `XcuSuffix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `XcuSuffix` and we want to reduce breaking changes.
 */
export const _XCU_SUFFIX = new InjectionToken<XcuSuffix>('XcuSuffix');

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[xcu-suffix]',
  providers: [{ provide: _XCU_SUFFIX, useExisting: XcuSuffix }],
})
export class XcuSuffix {}
