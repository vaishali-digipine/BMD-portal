import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePage } from './state-page';

describe('StatePage', () => {
  let component: StatePage;
  let fixture: ComponentFixture<StatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(StatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
