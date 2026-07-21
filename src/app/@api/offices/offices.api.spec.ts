import { TestBed } from '@angular/core/testing';

import { OfficesApi } from './offices.api';

describe('OfficesApi', () => {
  let service: OfficesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
