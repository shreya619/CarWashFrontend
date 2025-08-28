import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWasher } from './delete-washer';

describe('DeleteWasher', () => {
  let component: DeleteWasher;
  let fixture: ComponentFixture<DeleteWasher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWasher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWasher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
