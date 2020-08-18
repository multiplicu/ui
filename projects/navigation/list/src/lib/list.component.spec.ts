import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuListComponent } from './list.component';

describe('XcuListComponent', () => {
  let component: XcuListComponent;
  let fixture: ComponentFixture<XcuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XcuListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
