import { Constructor } from './constructor';
import { coerceBooleanProperty } from '../coercion/boolean-property';

export interface CanOpenOnHover {
  // Whether the component is openOnHover
  openOnHover: boolean;
}

export type CanOpenOnHoverCtor = Constructor<CanOpenOnHover>;

export function mixinOpenOnHover<T extends Constructor<{}>>(
  base: T
): CanOpenOnHoverCtor & T {
  return class extends base {
    private _openOnHover: boolean = false;

    public get openOnHover(): any {
      return this._openOnHover;
    }

    public set openOnHover(value: any) {
      this._openOnHover = coerceBooleanProperty(value);
    }

    public constructor(...args: any[]) {
      super(...args);
    }
  };
}
