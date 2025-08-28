import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent {
  amount: number = 0;
  message: string = '';

  constructor(private customerService: CustomerService) {}

  payNow() {
    if (this.amount <= 0) {
      this.message = 'Enter a valid amount.';
      return;
    }

    this.customerService.payForWash(this.amount).subscribe({
      next: (res) => {
        this.message = 'Payment initiated successfully!';
        console.log('Razorpay Response:', res);
        // You can parse res to show order_id, etc.
      },
      error: (err) => {
        this.message = 'Payment failed: ' + err.message;
        console.error(err);
      }
    });
  }
}
