import { TestBed } from '@angular/core/testing';

import { DepartmentsApi } from './departments.api';

describe('DepartmentsApi', () => {
  let service: DepartmentsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
