/*import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-washer',
  imports: [],
  templateUrl: './delete-washer.html',
  styleUrl: './delete-washer.scss'
})
export class DeleteWasher {

}*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // 👈 Import CommonModule

import { WasherService } from '../../../services/washer.service';

@Component({
  selector: 'app-delete-washer',
  standalone: true,               // 👈 ensure standalone is true
  imports: [CommonModule],        // 👈 add CommonModule for *ngIf, *ngFor etc.
  templateUrl: './delete-washer.html',
  styleUrls: ['./delete-washer.scss']   // 👈 should be plural "styleUrls"
})
export class DeleteWasherComponent {
  message: string = '';

  constructor(private washerService: WasherService, private router: Router) {}

  onDelete() {
  if (confirm('Are you sure you want to delete your account?')) {
    this.washerService.deleteAccount().subscribe({
      next: (response: string) => {
        this.message = response; // shows "Account deleted successfully."
        localStorage.removeItem('token'); // clear token since account is deleted

        setTimeout(() => {
          window.location.href = 'http://localhost:4200/'; // 👈 redirect
        }, 2000);
      },
      error: (err) => {
        this.message = err.error || 'Failed to delete account.';
      }
    });
  }
}

}