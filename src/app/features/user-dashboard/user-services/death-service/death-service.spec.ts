import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathService } from './death-service';

describe('DeathService', () => {
  let component: DeathService;
  let fixture: ComponentFixture<DeathService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeathService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
