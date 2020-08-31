import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuHeadComponent } from './head.component';

describe('XcuHeadComponent', () => {
  let component: XcuHeadComponent;
  let fixture: ComponentFixture<XcuHeadComponent>;

  beforeEach(async(() => {
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
