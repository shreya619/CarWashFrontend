import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer';
import { OrderRequestDTO } from '../../../models/OrderRequestDTO';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.html',
  styleUrls: ['./order.scss'],
    imports: [CommonModule, FormsModule],

})
export class OrderComponent {
  orders: any[] = [];
  statusFilter: string = 'unassigned';

  newOrder: OrderRequestDTO = {
    packageType: '',
    addOns: '',
    address: '',
    dateTime: '',
    washerName: '',
    washerEmail: '',
    washerId: 0
  };

  constructor(private customerService: CustomerService) {
    this.loadOrders();
  }

  loadOrders(): void {
    this.customerService.getOrders(this.statusFilter).subscribe({
      next: res => this.orders = res,
      error: err => console.error(err)
    });
  }

  placeOrder(): void {
    this.customerService.placeOrder(this.newOrder).subscribe({
      next: res => {
        alert('Order placed successfully!');
        this.newOrder = {
          packageType: '',
          addOns: '',
          address: '',
          dateTime: '',
          washerName: '',
          washerEmail: '',
          washerId: 0
        };
        this.loadOrders();
      },
      error: err => console.error(err)
    });
  }

  deleteOrder(id: number): void {
    if (!confirm('Are you sure you want to delete this order?')) return;
    this.customerService.deleteOrder(id).subscribe({
      next: res => this.loadOrders(),
      error: err => console.error(err)
    });
  }

  filterOrders(status: string): void {
    this.statusFilter = status;
    this.loadOrders();
  }
}
