import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageViewdetail } from './marriage-viewdetail';

describe('MarriageViewdetail', () => {
  let component: MarriageViewdetail;
  let fixture: ComponentFixture<MarriageViewdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarriageViewdetail],
    }).compileComponents();

    fixture = TestBed.createComponent(MarriageViewdetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
