import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuProfileComponent } from './profile.component';

describe('XcuProfileComponent', () => {
  let component: XcuProfileComponent;
  let fixture: ComponentFixture<XcuProfileComponent>;

  beforeEach(async(() => {
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
