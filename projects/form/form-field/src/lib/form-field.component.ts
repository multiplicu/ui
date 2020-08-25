import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { XcuFormFieldControl } from './../objects/form-field-control';
import { XcuHint } from './../objects/hint';

@Component({
  selector: 'xcu-form-field, div[xcu-form-field]',
  exportAs: 'xcuFormField',
  host: {
    class: 'xcu-form-field',
    '[class.xcu-form-field--invalid]': 'control.errorState',
    '[class.xcu-form-field--disabled]': 'control.disabled',
    '[class.xcu-form-field--autofilled]': 'control.autofilled',
  },
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class XcuFormFieldComponent implements AfterContentInit, OnDestroy {
  public required_: boolean;
  @HostBinding('class.required')
  @Input('required')
  public get required(): boolean {
    return this.required_;
  }
  public set required(v: boolean) {
    this.required_ = v || v !== undefined;
  }

  public optional_: boolean;
  @HostBinding('class.optional')
  @Input('optional')
  public get optional(): boolean {
    return this.optional_;
  }
  public set optional(v: boolean) {
    this.optional_ = v || v !== undefined;
  }

  @ContentChild(XcuFormFieldControl)
  private _formFieldControl: XcuFormFieldControl<any>;

  @ContentChild(XcuFormFieldControl) controlNonStatic: XcuFormFieldControl<any>;
  @ContentChild(XcuFormFieldControl, { static: true })
  controlStatic: XcuFormFieldControl<any>;
  public get control() {
    return (
      this._explicitFormFieldControl ||
      this.controlNonStatic ||
      this.controlStatic
    );
  }
  public set control(value) {
    this._explicitFormFieldControl = value;
  }
  private _explicitFormFieldControl: XcuFormFieldControl<any>;

  @ContentChildren(XcuHint, { descendants: true })
  private _hintChildren: QueryList<XcuHint> = new QueryList<XcuHint>();

  private _destroyed: Subject<void> = new Subject<void>();

  public constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterContentInit(): void {
    const control: XcuFormFieldControl<any> = this.control;

    // Subscribe to changes in the child control state in order to update the form field UI.
    control.stateChanges.pipe(startWith(null!)).subscribe(() => {
      // this._validatePlaceholders();
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Determines whether to display hints or errors. */
  public getDisplayedMessages(): 'error' | 'hint' {
    return this._hintChildren &&
      this._hintChildren.length > 0 &&
      this.control.errorState
      ? 'error'
      : 'hint';
  }

  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  private _syncDescribedByIds(): void {
    if (this.control) {
      let ids: string[] = [];

      if (this.control.userAriaDescribedBy) {
        ids.push(...this.control.userAriaDescribedBy.split(' '));
      }

      if (this.getDisplayedMessages() === 'error') {
        const startHint: XcuHint = this._hintChildren
          ? this._hintChildren.find((hint: XcuHint) => hint.align === 'start')
          : null;
        const endHint: XcuHint = this._hintChildren
          ? this._hintChildren.find((hint: XcuHint) => hint.align === 'end')
          : null;

        if (startHint) {
          ids.push(startHint.id);
        }

        if (endHint) {
          ids.push(endHint.id);
        }
      }

      this.control.setDescribedByIds(ids);
    }
  }
}
