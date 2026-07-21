import { TestBed } from '@angular/core/testing';

import { MarriageServiceApi } from './marriage-service.api';

describe('MarriageServiceApi', () => {
  let service: MarriageServiceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarriageServiceApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
