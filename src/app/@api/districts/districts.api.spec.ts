import { TestBed } from '@angular/core/testing';

import { DistrictsApi } from './districts.api';

describe('DistrictsApi', () => {
  let service: DistrictsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
