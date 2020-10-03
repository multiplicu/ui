import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XcuButtonComponent } from './button.component';

describe('XcuButtonComponent', () => {
  let component: XcuButtonComponent;
  let fixture: ComponentFixture<XcuButtonComponent>;

  beforeEach(async(() => {
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
