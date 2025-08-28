import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDropdown } from './login-dropdown';

describe('LoginDropdown', () => {
  let component: LoginDropdown;
  let fixture: ComponentFixture<LoginDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
