import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWasher } from './update-washer';

describe('UpdateWasher', () => {
  let component: UpdateWasher;
  let fixture: ComponentFixture<UpdateWasher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWasher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWasher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
