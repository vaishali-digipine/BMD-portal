import { TestBed } from '@angular/core/testing';

import { SlotApi } from './slot.api';

describe('SlotApi', () => {
  let service: SlotApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
