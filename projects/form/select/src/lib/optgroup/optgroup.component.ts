import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  InjectionToken,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  CanDisable,
  CanDisableCtor,
  mixinDisabled,
} from '@multiplicu/ui/core';

// Boilerplate for applying mixins to XcuOptgroup.
/** @docs-private */
class XcuOptgroupBase {}
const _XcuOptgroupMixinBase: CanDisableCtor &
  typeof XcuOptgroupBase = mixinDisabled(XcuOptgroupBase);

// Counter for unique group ids.
let _uniqueOptgroupIdCounter: number = 0;

@Directive()
export class _XcuOptgroupBase extends _XcuOptgroupMixinBase
  implements CanDisable {
  /** Label for the option group. */
  @Input() label: string;

  /** Unique id for the underlying label. */
  _labelId: string = `xcu-optgroup-label-${_uniqueOptgroupIdCounter++}`;

  static ngAcceptInputType_disabled: BooleanInput;
}

/**
 * Injection token that can be used to reference instances of `XcuOptgroup`. It serves as
 * alternative token to the actual `XcuOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const XCU_OPTGROUP = new InjectionToken<XcuOptgroupComponent>(
  'XcuOptgroup'
);

@Component({
  selector: 'xcu-optgroup, optgroup[xcu-optgroup]',
  exportAs: 'xcuOptgroup',
  templateUrl: './optgroup.component.html',
  styleUrls: ['./optgroup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: XCU_OPTGROUP, useExisting: XcuOptgroupComponent }],
})
export class XcuOptgroupComponent extends _XcuOptgroupBase {}
