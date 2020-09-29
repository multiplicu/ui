import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuDialogHeadlineComponent } from './headline.component';

describe('XcuDialogHeadlineComponent', () => {
  let component: XcuDialogHeadlineComponent;
  let fixture: ComponentFixture<XcuDialogHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuDialogHeadlineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuDialogHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
