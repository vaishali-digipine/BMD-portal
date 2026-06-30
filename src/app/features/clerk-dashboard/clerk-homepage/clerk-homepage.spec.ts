import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkHomepage } from './clerk-homepage';

describe('ClerkHomepage', () => {
  let component: ClerkHomepage;
  let fixture: ComponentFixture<ClerkHomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkHomepage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClerkHomepage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
