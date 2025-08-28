import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Washer } from './washer';

describe('Washer', () => {
  let component: Washer;
  let fixture: ComponentFixture<Washer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Washer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Washer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
