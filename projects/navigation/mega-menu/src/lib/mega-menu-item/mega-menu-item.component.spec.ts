import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XcuMegaMenuItemComponent } from './mega-menu-item.component';

describe('XcuMegaMenuItemComponent', () => {
  let component: XcuMegaMenuItemComponent;
  let fixture: ComponentFixture<XcuMegaMenuItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XcuMegaMenuItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuMegaMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
