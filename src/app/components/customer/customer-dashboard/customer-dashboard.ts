import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ IMPORT THIS
import { Router } from '@angular/router';           // ✅ Fixes "Cannot find name 'Router'"
import { Component, OnInit } from '@angular/core'; // ✅ Fixes "Cannot find name 'OnInit'"

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // ✅ ADD THIS TO IMPORTS
  ],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.scss']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Auto-redirect if just '/customer'
    this.router.navigate(['customer/profile']);
  }
}