import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuDialogContentComponent } from './content.component';

describe('XcuDialogContentComponent', () => {
  let component: XcuDialogContentComponent;
  let fixture: ComponentFixture<XcuDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuDialogContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
