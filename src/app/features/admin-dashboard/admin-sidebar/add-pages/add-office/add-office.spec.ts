import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffice } from './add-office';

describe('AddOffice', () => {
  let component: AddOffice;
  let fixture: ComponentFixture<AddOffice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOffice],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOffice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
