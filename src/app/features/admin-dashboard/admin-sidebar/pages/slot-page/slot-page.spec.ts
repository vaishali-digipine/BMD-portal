import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotPage } from './slot-page';

describe('SlotPage', () => {
  let component: SlotPage;
  let fixture: ComponentFixture<SlotPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
