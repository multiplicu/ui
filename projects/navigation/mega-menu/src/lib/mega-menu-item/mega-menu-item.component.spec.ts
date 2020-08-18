import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuMegaMenuItemComponent } from './mega-menu-item.component';

describe('XcuMegaMenuItemComponent', () => {
  let component: XcuMegaMenuItemComponent;
  let fixture: ComponentFixture<XcuMegaMenuItemComponent>;

  beforeEach(async(() => {
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
