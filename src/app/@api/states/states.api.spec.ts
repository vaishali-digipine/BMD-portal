import { TestBed } from '@angular/core/testing';

import { StatesApi } from './states.api';

describe('StatesApi', () => {
  let service: StatesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
