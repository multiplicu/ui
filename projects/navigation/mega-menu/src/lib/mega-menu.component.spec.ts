import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuMegaMenuComponent } from './mega-menu.component';

describe('XcuMegaMenuComponent', () => {
  let component: XcuMegaMenuComponent;
  let fixture: ComponentFixture<XcuMegaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XcuMegaMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
