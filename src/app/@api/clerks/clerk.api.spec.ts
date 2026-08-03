import { TestBed } from '@angular/core/testing';

import { ClerkApi } from './clerk.api';

describe('ClerkApi', () => {
  let service: ClerkApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClerkApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
