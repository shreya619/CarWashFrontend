/*import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-profile',
  imports: [],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.scss'
})
export class CustomerProfileComponent {

}*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer'; // Adjust path as needed

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-profile.html',
  styleUrls: ['./customer-profile.scss']
})
export class CustomerProfileComponent implements OnInit {
  customer: any = {
    email: '',
    username: '',
    phoneNo: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomerProfile().subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('❌ Failed to fetch profile:', err);
        this.errorMessage = 'Failed to fetch profile. Please ensure you are logged in.';
      }
    });
  }

  updateProfile(): void {
    this.customerService.updateProfile(this.customer).subscribe({
      next: (response: any) => {
        this.successMessage = response;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('❌ Update error:', err);
        if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else if (err.status === 0) {
          this.errorMessage = 'Backend is unreachable.';
        } else {
          this.errorMessage = 'Unexpected error occurred.';
        }
        this.successMessage = '';
      }
    });
  }

  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.customerService.deleteProfile().subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('❌ Deletion error:', err);
          this.errorMessage = 'Failed to delete account. Try again.';
        }
      });
    }
  }
}
