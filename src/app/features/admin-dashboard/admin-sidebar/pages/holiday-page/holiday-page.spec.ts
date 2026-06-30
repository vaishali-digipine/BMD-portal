import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPage } from './holiday-page';

describe('HolidayPage', () => {
  let component: HolidayPage;
  let fixture: ComponentFixture<HolidayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
