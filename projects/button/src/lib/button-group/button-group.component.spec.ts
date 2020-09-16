import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuButtonGroupComponent } from './button-group.component';

describe('XcuButtonGroupComponent', () => {
  let component: XcuButtonGroupComponent;
  let fixture: ComponentFixture<XcuButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuButtonGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
