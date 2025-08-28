import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Washpackage } from './washpackage';

describe('Washpackage', () => {
  let component: Washpackage;
  let fixture: ComponentFixture<Washpackage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Washpackage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Washpackage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
