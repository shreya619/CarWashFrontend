/*import { Component } from '@angular/core';

@Component({
  selector: 'app-send-invoice',
  imports: [],
  templateUrl: './send-invoice.html',
  styleUrl: './send-invoice.scss'
})
export class SendInvoice {

}*/


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasherService } from '../../../services/washer.service';

@Component({
  selector: 'app-send-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-invoice.html',
  styleUrls: ['./send-invoice.scss']
})
export class SendInvoiceComponent {
   Object = Object;  // <-- Add this line

  invoice: any = {
    orderId: '',
    customerName: '',
    customerEmail: '',
    customerId: '',
    washerName: '',
    washerId: '',
    packageName: '',
    packageAmount: '',
    addons: {},       // key-value pair: addonName -> price
    tax: '',
    totalAmount: ''
  };

  message: string = '';

  constructor(private washerService: WasherService) {}

  onSendInvoice() {
    this.washerService.sendInvoice(this.invoice).subscribe({
      next: (res: string) => {
        this.message = res;
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Failed to send invoice.';
      }
    });
  }

  addAddon(addonName: string, price: number) {
    this.invoice.addons[addonName] = price;
  }

  removeAddon(addonName: string) {
    delete this.invoice.addons[addonName];
  }
}

