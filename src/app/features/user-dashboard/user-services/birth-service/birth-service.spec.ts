import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthService } from './birth-service';

describe('BirthService', () => {
  let component: BirthService;
  let fixture: ComponentFixture<BirthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthService],
    }).compileComponents();

    fixture = TestBed.createComponent(BirthService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
