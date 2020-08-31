import { XcuError } from './../objects/error';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  InjectionToken,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { XcuFormFieldControl } from './../objects/form-field-control';
import { XcuHint } from './../objects/hint';

/**
 * Injection token that can be used to inject an instances of `XcuFormField`. It serves
 * as alternative token to the actual `XcuFormField` class which would cause unnecessary
 * retention of the `XcuFormField` class and its component metadata.
 */
export const XCU_FORM_FIELD = new InjectionToken<XcuFormFieldComponent>(
  'XcuFormField'
);

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
  providers: [{ provide: XCU_FORM_FIELD, useExisting: XcuFormFieldComponent }],
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
  public _formFieldControl: XcuFormFieldControl<any>;

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

  @ContentChildren(XcuError, { descendants: true })
  private _errorChildren: QueryList<XcuError> = new QueryList<XcuError>();

  @ContentChildren(XcuHint, { descendants: true })
  private _hintChildren: QueryList<XcuHint> = new QueryList<XcuHint>();

  private _destroyed: Subject<void> = new Subject<void>();

  public constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterContentInit(): void {
    const control: XcuFormFieldControl<any> = this.control;
    if (control.controlType) {
      this.elementRef.nativeElement.classList.add(
        `xcu-form-field-type-${control.controlType}`
      );
    }

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

    // Re-validate when the number of hints changes.
    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Determines whether to display hints or errors. */
  public getDisplayedMessages(): 'error' | 'hint' {
    return this._errorChildren &&
      this._errorChildren.length > 0 &&
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

      if (this.getDisplayedMessages() === 'hint') {
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
      } else if (this._errorChildren) {
        ids = this._errorChildren.map((error: XcuError) => error.id);
      }

      this.control.setDescribedByIds(ids);
    }
  }

  /** Does any extra processing that is required when handling the hints. */
  private _processHints(): void {
    this._validateHints();
    this._syncDescribedByIds();
  }

  /**
   * Ensure that there is a maximum of one of each `<mat-hint>` alignment specified, with the
   * attribute being considered as `align="start"`.
   */
  private _validateHints(): void {
    if (this._hintChildren) {
      let startHint: XcuHint;
      let endHint: XcuHint;

      // this._hintChildren.forEach((hint: XcuHint) => {
      //   if (hint.align === 'start') {
      //     if (startHint || this.hintLabel) {
      //       throw getMatFormFieldDuplicatedHintError('start');
      //     }
      //     startHint = hint;
      //   } else if (hint.align === 'end') {
      //     if (endHint) {
      //       throw getMatFormFieldDuplicatedHintError('end');
      //     }
      //     endHint = hint;
      //   }
      // });
    }
  }
}
