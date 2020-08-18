import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuCheckboxComponent } from './checkbox.component';

describe('XcuCheckboxComponent', () => {
  let component: XcuCheckboxComponent;
  let fixture: ComponentFixture<XcuCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XcuCheckboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
