/*import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var Razorpay: any;
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
      next: (res: any) => {
        console.log('Dummy Payment Order Response:', res);

        // Fake Razorpay modal
        const options: any = {
          key: 'rzp_test_dummyKey123', // dummy key
          amount: this.amount * 100,
          currency: 'INR',
          name: 'Car Wash Service',
          description: 'Dummy Payment',
          order_id: res.order_id, // fake order_id from backend
          handler: (response: any) => {
            console.log('Dummy Payment successful:', response);
            this.message = '✅ Payment successful! Order ID: ' + res.order_id;
          },
          modal: {
            escape: true,
          },
          prefill: {
            name: 'Demo User',
            email: 'demo@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      error: (err) => {
        this.message = 'Payment failed: ' + err.message;
        console.error(err);
      }
    });
  }
}*/
import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent {
  amount: number = 0; // two-way bound with input

  constructor(private customerService: CustomerService) {}
payNow() {
  if (!this.amount || this.amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  this.customerService.initiatePayment(this.amount).subscribe({
    next: (order: any) => {
      console.log('Dummy backend order:', order);

      // ⚡ Instead of real Razorpay popup, just simulate success
      setTimeout(() => {
        alert('✅ Dummy Payment Successful! OrderId: ' + order.orderId);
        console.log('Payment Success (Dummy):', order);
      }, 1000);
    },
    error: (err) => {
      console.error('Backend error:', err);
      alert('❌ Could not initiate payment');
    }
  });
}
}