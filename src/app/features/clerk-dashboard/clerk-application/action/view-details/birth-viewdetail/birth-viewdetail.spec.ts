import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthViewdetail } from './birth-viewdetail';

describe('BirthViewdetail', () => {
  let component: BirthViewdetail;
  let fixture: ComponentFixture<BirthViewdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthViewdetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BirthViewdetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
