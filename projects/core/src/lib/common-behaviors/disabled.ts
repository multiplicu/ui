import { coerceBooleanProperty } from '../coercion/boolean-property';
import { Constructor } from './constructor';

export interface CanDisable {
  // Whether the component is disabled
  disabled: boolean;
}

export type CanDisableCtor = Constructor<CanDisable>;

export function mixinDisabled<T extends Constructor<{}>>(
  base: T
): CanDisableCtor & T {
  return class extends base {
    private _disabled: boolean = false;

    public get disabled(): any {
      return this._disabled;
    }

    public set disabled(value: any) {
      this._disabled = coerceBooleanProperty(value);
    }

    public constructor(...args: any[]) {
      super(...args);
    }
  };
}
