import { Constructor } from './constructor';
import { coerceBooleanProperty } from '../coercion/boolean-property';

export interface CanDisable {
  // Whether the component is disabled
  disabled: boolean;
}

export type CanDisableCtor = Constructor<CanDisable>;

export function mixinDisabled<T extends Constructor<{}>>(
  base: T
): CanDisableCtor & T {
  return class extends base {
    private disabled_: boolean = false;

    public get disabled(): any {
      return this.disabled_;
    }

    public set disabled(value: any) {
      this.disabled_ = coerceBooleanProperty(value);
    }

    public constructor(...args: any[]) {
      super(...args);
    }
  };
}
