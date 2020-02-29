import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalNavComponent } from './local-nav.component';

describe('LocalNavComponent', () => {
  let component: LocalNavComponent;
  let fixture: ComponentFixture<LocalNavComponent>;

  beforeEach(async(() => {
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
