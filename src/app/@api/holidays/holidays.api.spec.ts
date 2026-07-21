import { TestBed } from '@angular/core/testing';

import { HolidaysApi } from './holidays.api';

describe('HolidaysApi', () => {
  let service: HolidaysApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidaysApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
