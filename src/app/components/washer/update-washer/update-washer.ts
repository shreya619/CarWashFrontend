/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasherService } from '../../../services/washer.service';

@Component({
  selector: 'app-update-washer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-washer.html',
  styleUrls: ['./update-washer.scss']
})
export class UpdateWasherComponent implements OnInit {
  washer: any = {
    email: '',
    username: '',
    phoneNo: '',
    password: ''
  };
  message: string = '';

  constructor(private washerService: WasherService) {}

  ngOnInit(): void {
    // Fetch current washer details and autofill form
    this.washerService.getProfile().subscribe({
      next: (data: any) => {
        this.washer = {
          email: data.email,
          username: data.username,
          phoneNo: data.phoneNo,
          password: ''  // leave blank for update
        };
      },
      error: (err: any) => {
        this.message = 'Failed to load profile.';
      }
    });
  }

  onUpdate() {
    const updatePayload = {
      email: this.washer.email,    // email stays same
      username: this.washer.username,
      phoneNo: this.washer.phoneNo,
      password: this.washer.password
    };

    this.washerService.updateProfile(updatePayload).subscribe({
      next: (response: any) => {
        this.message = response; // backend success message
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Update failed.';
      }
    });
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasherService } from '../../../services/washer.service';

@Component({
  selector: 'app-update-washer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-washer.html',
  styleUrls: ['./update-washer.scss']
})
export class UpdateWasherComponent implements OnInit {
  washer: any = {
    email: '',
    username: '',
    phoneNo: '',
    password: ''
  };
  message: string = '';
  showPassword: boolean = false; // toggle password visibility
  loading: boolean = true;

  constructor(private washerService: WasherService) {}

  ngOnInit(): void {
    // Fetch current washer details (auto-fill form)
    this.washerService.getProfile().subscribe({
      next: (data: any) => {
        this.washer = {
          email: data.email,
          username: data.username,
          phoneNo: data.phoneNo,
          password: '' // don’t expose real password, leave empty
        };
        this.loading = false;
      },
      error: () => {
        this.message = '⚠️ Failed to load profile.';
        this.loading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onUpdate() {
    const updatePayload = {
      email: this.washer.email, // read-only in frontend, but send for backend
      username: this.washer.username,
      phoneNo: this.washer.phoneNo,
      password: this.washer.password // send only if user enters new one
    };

    this.washerService.updateProfile(updatePayload).subscribe({
      next: (response: any) => {
        this.message = '✅ Profile updated successfully!';
      },
      error: (err: any) => {
        this.message = err.error?.message || '❌ Update failed.';
      }
    });
  }
}
