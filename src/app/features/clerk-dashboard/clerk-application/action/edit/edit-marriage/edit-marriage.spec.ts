import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarriage } from './edit-marriage';

describe('EditMarriage', () => {
  let component: EditMarriage;
  let fixture: ComponentFixture<EditMarriage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMarriage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMarriage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
