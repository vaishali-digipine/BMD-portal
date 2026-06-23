import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplication } from './user-application';

describe('UserApplication', () => {
  let component: UserApplication;
  let fixture: ComponentFixture<UserApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserApplication],
    }).compileComponents();

    fixture = TestBed.createComponent(UserApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
