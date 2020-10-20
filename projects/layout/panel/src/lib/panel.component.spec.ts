import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuPanelComponent } from './panel.component';

describe('XcuPanelComponent', () => {
  let component: XcuPanelComponent;
  let fixture: ComponentFixture<XcuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
