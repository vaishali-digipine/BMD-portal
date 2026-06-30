import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBirth } from './edit-birth';

describe('EditBirth', () => {
  let component: EditBirth;
  let fixture: ComponentFixture<EditBirth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBirth],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBirth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
