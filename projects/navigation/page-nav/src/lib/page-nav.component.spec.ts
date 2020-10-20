import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNavComponent } from './page-nav.component';

describe('PageNavComponent', () => {
  let component: PageNavComponent;
  let fixture: ComponentFixture<PageNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
