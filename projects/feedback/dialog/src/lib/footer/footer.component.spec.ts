import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuFooterComponent } from './footer.component';

describe('XcuFooterComponent', () => {
  let component: XcuFooterComponent;
  let fixture: ComponentFixture<XcuFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
