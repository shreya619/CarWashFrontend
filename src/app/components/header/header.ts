/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterDropdownComponent } from '../auth/register-dropdown/register-dropdown';
import { LoginDropdownComponent } from '../auth/login-dropdown/login-dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RegisterDropdownComponent, LoginDropdownComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  isRegisterDropdownOpen = false;
  isLoginDropdownOpen = false;

  toggleRegisterDropdown() {
    this.isRegisterDropdownOpen = !this.isRegisterDropdownOpen;
    this.isLoginDropdownOpen = false;
  }

  toggleLoginDropdown() {
    this.isLoginDropdownOpen = !this.isLoginDropdownOpen;
    this.isRegisterDropdownOpen = false;
  }

  closeDropdowns() {
    this.isRegisterDropdownOpen = false;
    this.isLoginDropdownOpen = false;
  }
}*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterDropdownComponent } from '../auth/register-dropdown/register-dropdown';
import { LoginDropdownComponent } from '../auth/login-dropdown/login-dropdown';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RegisterDropdownComponent, LoginDropdownComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  isRegisterDropdownOpen = false;
  isLoginDropdownOpen = false;

  constructor(public authService: AuthService) {}

  toggleRegisterDropdown() {
    this.isRegisterDropdownOpen = !this.isRegisterDropdownOpen;
    this.isLoginDropdownOpen = false;
  }

  toggleLoginDropdown() {
    this.isLoginDropdownOpen = !this.isLoginDropdownOpen;
    this.isRegisterDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
  }

  closeDropdowns() {
    this.isRegisterDropdownOpen = false;
    this.isLoginDropdownOpen = false;
  }
}
