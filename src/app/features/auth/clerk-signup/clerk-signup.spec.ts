import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkSignup } from './clerk-signup';

describe('ClerkSignup', () => {
  let component: ClerkSignup;
  let fixture: ComponentFixture<ClerkSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkSignup],
    }).compileComponents();

    fixture = TestBed.createComponent(ClerkSignup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
