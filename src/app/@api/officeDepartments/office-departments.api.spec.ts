import { TestBed } from '@angular/core/testing';

import { OfficeDepartmentsApi } from './office-departments.api';

describe('OfficeDepartmentsApi', () => {
  let service: OfficeDepartmentsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeDepartmentsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
