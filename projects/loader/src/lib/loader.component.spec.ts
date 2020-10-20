import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuLoaderComponent } from './loader.component';

describe('XcuLoaderComponent', () => {
  let component: XcuLoaderComponent;
  let fixture: ComponentFixture<XcuLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
