import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeath } from './edit-death';

describe('EditDeath', () => {
  let component: EditDeath;
  let fixture: ComponentFixture<EditDeath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeath],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeath);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
