import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XcuListItemComponent } from './list-item.component';

describe('XcuListItemComponent', () => {
  let component: XcuListItemComponent;
  let fixture: ComponentFixture<XcuListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XcuListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
