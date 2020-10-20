import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuDialogComponent } from './dialog.component';

describe('XcuDialogComponent', () => {
  let component: XcuDialogComponent;
  let fixture: ComponentFixture<XcuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
