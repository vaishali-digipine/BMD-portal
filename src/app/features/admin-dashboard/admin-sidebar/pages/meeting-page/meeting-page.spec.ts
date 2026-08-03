import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPage } from './meeting-page';

describe('MeetingPage', () => {
  let component: MeetingPage;
  let fixture: ComponentFixture<MeetingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
