import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkApplication } from './clerk-application';

describe('ClerkApplication', () => {
  let component: ClerkApplication;
  let fixture: ComponentFixture<ClerkApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkApplication],
    }).compileComponents();

    fixture = TestBed.createComponent(ClerkApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
