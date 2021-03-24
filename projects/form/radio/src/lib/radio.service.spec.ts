import { TestBed } from '@angular/core/testing';

import { XcuRadioService } from './radio.service';

describe('XcuRadioService', () => {
  let service: XcuRadioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XcuRadioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
