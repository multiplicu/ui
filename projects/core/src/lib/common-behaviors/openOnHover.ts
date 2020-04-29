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
    private openOnHover_: boolean = false;

    public get openOnHover(): any {
      return this.openOnHover_;
    }

    public set openOnHover(value: any) {
      this.openOnHover_ = coerceBooleanProperty(value);
    }

    public constructor(...args: any[]) {
      super(...args);
    }
  };
}
