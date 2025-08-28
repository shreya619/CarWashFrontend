
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router'; // ✅ ADD THIS

@Component({
  selector: 'app-login-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-dropdown.html',
  styleUrls: ['./login-dropdown.scss']
})
export class LoginDropdownComponent {
  @Output() closeDropdown = new EventEmitter<void>();

  selectedRole: string = '';
  formData = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {} // ✅ INJECT ROUTER

  selectRole(role: string) {
    this.selectedRole = role;
  }
 
onSubmit() {
  if (this.isFormValid()) {
    this.authService.login(this.formData.email, this.formData.password, this.selectedRole).subscribe({
      next: (response: string) => {
        // Remove "Bearer " prefix if present
        const token = response.startsWith('Bearer ') ? response.substring(7) : response;

        // ✅ Validate token structure
        if (token.startsWith('eyJ') && token.split('.').length === 3) {
          this.authService.saveToken(token);
          this.closeDropdown.emit();

          // ✅ Navigate based on role
          if (this.selectedRole === 'admin') {
            this.router.navigate(['/admin']);
          } else if (this.selectedRole === 'customer') {
            this.router.navigate(['/customer']);
          } else if (this.selectedRole === 'washer') {
            this.router.navigate(['/washer']);
          }
        } else {
          this.errorMessage = '❌ Login failed: Invalid token format';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = '❌ Invalid credentials or server error.';
      }
    });
  }
}





  isFormValid(): boolean {
    return !!(this.selectedRole && this.formData.email && this.formData.password);
  }

  close() {
    this.closeDropdown.emit();
  }
}
