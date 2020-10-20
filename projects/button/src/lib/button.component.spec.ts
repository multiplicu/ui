import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { XcuButtonComponent } from './button.component';

describe('XcuButtonComponent', () => {
  let component: XcuButtonComponent;
  let fixture: ComponentFixture<XcuButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XcuButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
