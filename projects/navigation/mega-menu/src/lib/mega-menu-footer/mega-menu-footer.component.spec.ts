import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XcuMegaMenuFooterComponent } from './mega-menu-footer.component';

describe('XcuMegaMenuFooterComponent', () => {
  let component: XcuMegaMenuFooterComponent;
  let fixture: ComponentFixture<XcuMegaMenuFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XcuMegaMenuFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuMegaMenuFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
