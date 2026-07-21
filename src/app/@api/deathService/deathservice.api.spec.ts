import { TestBed } from '@angular/core/testing';

import { DeathserviceApi } from './deathservice.api';

describe('DeathserviceApi', () => {
  let service: DeathserviceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeathserviceApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
