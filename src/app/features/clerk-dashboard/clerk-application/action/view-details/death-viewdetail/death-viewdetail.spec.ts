import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathViewdetail } from './death-viewdetail';

describe('DeathViewdetail', () => {
  let component: DeathViewdetail;
  let fixture: ComponentFixture<DeathViewdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathViewdetail],
    }).compileComponents();

    fixture = TestBed.createComponent(DeathViewdetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
