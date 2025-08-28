


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasherService, Order } from '../../../services/washer.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss']
})
export class OrdersComponent {
  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';
  type: string = 'current'; // current, past, unassigned
  statusOptions: string[] = ['pending', 'started', 'in-progress', 'completed'];

  constructor(private washerService: WasherService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.errorMessage = '';
    this.washerService.getOrders(this.type).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
      }
    });
  }

  changeType(newType: string) {
    this.type = newType;
    this.loadOrders();
  }

  updateStatus(order: Order, newStatus: string) {
    this.washerService.updateOrderStatus(order.orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        order.status = updatedOrder.status;
        alert('Status updated successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status.');
      }
    });
  }
}
