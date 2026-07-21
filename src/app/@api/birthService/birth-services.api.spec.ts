import { TestBed } from '@angular/core/testing';

import { BirthServicesApi } from './birth-services.api';

describe('BirthServicesApi', () => {
  let service: BirthServicesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthServicesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
