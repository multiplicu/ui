import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocalNavComponent } from './local-nav.component';

describe('LocalNavComponent', () => {
  let component: LocalNavComponent;
  let fixture: ComponentFixture<LocalNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
