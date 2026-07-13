import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPage } from './district-page';

describe('DistrictPage', () => {
  let component: DistrictPage;
  let fixture: ComponentFixture<DistrictPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DistrictPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
