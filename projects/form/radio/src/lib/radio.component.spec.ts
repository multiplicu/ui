import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuRadioComponent } from './radio.component';

describe('XcuRadioComponent', () => {
  let component: XcuRadioComponent;
  let fixture: ComponentFixture<XcuRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuRadioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
