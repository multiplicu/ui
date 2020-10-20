import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuDialogActionComponent } from './action.component';

describe('XcuDialogActionComponent', () => {
  let component: XcuDialogActionComponent;
  let fixture: ComponentFixture<XcuDialogActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuDialogActionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuDialogActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
