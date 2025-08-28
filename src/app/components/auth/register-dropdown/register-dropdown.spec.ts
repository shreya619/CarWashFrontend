import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDropdown } from './register-dropdown';

describe('RegisterDropdown', () => {
  let component: RegisterDropdown;
  let fixture: ComponentFixture<RegisterDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
