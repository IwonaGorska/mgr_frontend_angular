import { TestBed } from '@angular/core/testing';

import { TestsServiceService } from './tests-service.service';

describe('TestsServiceService', () => {
  let service: TestsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
