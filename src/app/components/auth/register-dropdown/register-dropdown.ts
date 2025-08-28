import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-dropdown.html',
  styleUrls: ['./register-dropdown.scss']
})
export class RegisterDropdownComponent {
  @Output() closeDropdown = new EventEmitter<void>();
  
  selectedRole: string = '';
  formData = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };
 successMessage: string = '';
  errorMessage: string = '';
  selectRole(role: string) {
    this.selectedRole = role;
  }

 
/*
    onSubmit() {
  if (this.isFormValid()) {
    if (this.selectedRole === 'customer') {
      const customerData = {
        username: this.formData.username,
        email: this.formData.email,
        phoneNo: this.formData.phone,
        password: this.formData.password
      };

      fetch('http://localhost:8080/api/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      })
      .then(async response => {
        const message = await response.text();
        if (response.ok) {
          this.successMessage = message;
          this.errorMessage = '';
          setTimeout(() => this.closeDropdown.emit(), 2000); // Close dropdown after success
        } else {
          this.successMessage = '';
          this.errorMessage = message || 'Registration failed.';
        }
      })
      .catch(error => {
        this.successMessage = '';
        this.errorMessage = 'Server error. Try again.';
        console.error('Error:', error);
      });
    } else {
      this.errorMessage = 'Registration for washer is not yet implemented.';
    }
  }
}
*/

onSubmit() {
  if (this.isFormValid()) {
    if (this.selectedRole === 'customer') {
      const customerData = {
        username: this.formData.username,
        email: this.formData.email,
        phoneNo: this.formData.phone,
        password: this.formData.password
      };

      fetch('http://localhost:8080/api/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      })
      .then(async response => {
        const message = await response.text();
        if (response.ok) {
          this.successMessage = message;
          this.errorMessage = '';
          setTimeout(() => this.closeDropdown.emit(), 2000);
        } else {
          this.successMessage = '';
          this.errorMessage = message || 'Registration failed.';
        }
      })
      .catch(error => {
        this.successMessage = '';
        this.errorMessage = 'Server error. Try again.';
        console.error('Error:', error);
      });

    } else if (this.selectedRole === 'washer') {
      const washerData = {
        username: this.formData.username,
        email: this.formData.email,
        phoneNo: this.formData.phone,
        password: this.formData.password
      };

      fetch('http://localhost:8080/api/washers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(washerData)
      })
      .then(async response => {
        const message = await response.text();
        if (response.ok) {
          this.successMessage = message;
          this.errorMessage = '';
          setTimeout(() => this.closeDropdown.emit(), 2000);
        } else {
          this.successMessage = '';
          this.errorMessage = message || 'Registration failed.';
        }
      })
      .catch(error => {
        this.successMessage = '';
        this.errorMessage = 'Server error. Try again.';
        console.error('Error:', error);
      });

    } else {
      this.errorMessage = 'Please select a valid role.';
    }
  }
}


 

  isFormValid(): boolean {
  const emailPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
  const phonePattern = /^\d{10}$/;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

  if (!this.selectedRole) {
    this.errorMessage = 'Please select a role.';
    return false;
  }

  if (!this.formData.username || !this.formData.email || !this.formData.phone || !this.formData.password || !this.formData.confirmPassword) {
    this.errorMessage = 'Please fill all fields.';
    return false;
  }

  if (!emailPattern.test(this.formData.email)) {
    this.errorMessage = 'Invalid email format.';
    return false;
  }

  if (!phonePattern.test(this.formData.phone)) {
    this.errorMessage = 'Phone number must be 10 digits.';
    return false;
  }

  if (!passwordPattern.test(this.formData.password)) {
    this.errorMessage = 'Password must be at least 8 characters, include uppercase, lowercase, digit, and special character.';
    return false;
  }

  if (this.formData.password !== this.formData.confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    return false;
  }

  this.errorMessage = '';
  return true;
}


  close() {
    this.closeDropdown.emit();
  }
}