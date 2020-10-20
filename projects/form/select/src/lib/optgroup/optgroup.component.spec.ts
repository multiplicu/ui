import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OptgroupComponent } from './optgroup.component';

describe('OptgroupComponent', () => {
  let component: OptgroupComponent;
  let fixture: ComponentFixture<OptgroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OptgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
