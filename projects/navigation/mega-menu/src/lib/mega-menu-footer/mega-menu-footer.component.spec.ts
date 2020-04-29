import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuFooterComponent } from './mega-menu-footer.component';

describe('MegaMenuFooterComponent', () => {
  let component: MegaMenuFooterComponent;
  let fixture: ComponentFixture<MegaMenuFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaMenuFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaMenuFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
