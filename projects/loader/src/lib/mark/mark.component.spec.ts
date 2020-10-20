import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcuMarkComponent } from './mark.component';

describe('XcuMarkComponent', () => {
  let component: XcuMarkComponent;
  let fixture: ComponentFixture<XcuMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XcuMarkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcuMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
