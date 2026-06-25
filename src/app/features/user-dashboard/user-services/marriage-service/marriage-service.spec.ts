import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageService } from './marriage-service';

describe('MarriageService', () => {
  let component: MarriageService;
  let fixture: ComponentFixture<MarriageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarriageService],
    }).compileComponents();

    fixture = TestBed.createComponent(MarriageService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
