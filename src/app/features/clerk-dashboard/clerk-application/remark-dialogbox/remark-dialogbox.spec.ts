import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkDialogbox } from './remark-dialogbox';

describe('RemarkDialogbox', () => {
  let component: RemarkDialogbox;
  let fixture: ComponentFixture<RemarkDialogbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkDialogbox],
    }).compileComponents();

    fixture = TestBed.createComponent(RemarkDialogbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
