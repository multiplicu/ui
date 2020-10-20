import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XcuProfileComponent } from './profile.component';

describe('XcuProfileComponent', () => {
  let component: XcuProfileComponent;
  let fixture: ComponentFixture<XcuProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XcuProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
