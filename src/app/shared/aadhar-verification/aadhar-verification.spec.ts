import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharVerification } from './aadhar-verification';

describe('AadharVerification', () => {
  let component: AadharVerification;
  let fixture: ComponentFixture<AadharVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AadharVerification],
    }).compileComponents();

    fixture = TestBed.createComponent(AadharVerification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
