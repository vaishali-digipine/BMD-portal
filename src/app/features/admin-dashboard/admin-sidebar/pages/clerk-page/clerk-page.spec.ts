import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkPage } from './clerk-page';

describe('ClerkPage', () => {
  let component: ClerkPage;
  let fixture: ComponentFixture<ClerkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClerkPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
