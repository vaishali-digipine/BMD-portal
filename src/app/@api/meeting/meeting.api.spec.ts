import { TestBed } from '@angular/core/testing';

import { MeetingApi } from './meeting.api';

describe('MeetingApi', () => {
  let service: MeetingApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
