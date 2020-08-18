import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuListGroupComponent } from './list-group.component';

describe('XcuListGroupComponent', () => {
  let component: XcuListGroupComponent;
  let fixture: ComponentFixture<XcuListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XcuListGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
