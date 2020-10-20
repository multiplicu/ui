import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XcuHeadComponent } from './head.component';

describe('XcuHeadComponent', () => {
  let component: XcuHeadComponent;
  let fixture: ComponentFixture<XcuHeadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XcuHeadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
