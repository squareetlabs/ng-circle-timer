import { TestBed } from '@angular/core/testing';

import { NgCircleTimerService } from './ng-circle-timer.service';

describe('NgCircleTimerService', () => {
  let service: NgCircleTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgCircleTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
