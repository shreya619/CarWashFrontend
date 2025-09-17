/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer';
import { Order } from '../../../models/Order';
@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.html',
  styleUrls: ['./order.scss'],
  imports: [CommonModule, FormsModule],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';
  statusFilter: string = 'unassigned'; // pending, started, completed, unassigned
  editMode: boolean = false;
  selectedOrderId: number | null = null;

  newOrder: Order = {
    packageType: '',
    addOns: '',
    address: '',
    dateTime: '',
    washerName: '',
    washerEmail: '',
    washerId: 0,
  };

  statusOptions: string[] = ['pending', 'started', 'in-progress', 'completed'];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.errorMessage = '';
    this.customerService.getOrders(this.statusFilter).subscribe({
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

  changeStatusFilter(newFilter: string) {
    this.statusFilter = newFilter;
    this.loadOrders();
  }

  startEdit(order: Order) {
    this.editMode = true;
    this.selectedOrderId = order.orderId ?? null;
    this.newOrder = { ...order };
  }

  updateOrder() {
    if (!this.selectedOrderId) return;
    this.customerService.updateOrder(this.selectedOrderId, this.newOrder).subscribe({
      next: () => {
        alert('Order updated successfully!');
        this.resetForm();
        this.loadOrders();
      },
      error: (err) => alert('Failed to update order: ' + err.message),
    });
  }

  deleteOrder(id: number | undefined) {
  if (id === undefined) {
    alert('Order ID is missing, cannot delete!');
    return;
  }

  if (!confirm('Are you sure you want to delete this order?')) return;
  this.customerService.deleteOrder(id).subscribe({
    next: () => {
      alert('Order deleted successfully!');
      this.loadOrders();
    },
    error: (err) => alert('Failed to delete order: ' + err.message),
  });
}


  resetForm() {
    this.newOrder = {
      packageType: '',
      addOns: '',
      address: '',
      dateTime: '',
      washerName: '',
      washerEmail: '',
      washerId: 0,
    };
    this.editMode = false;
    this.selectedOrderId = null;
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer';
import { Order } from '../../../models/Order';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.html',
  styleUrls: ['./order.scss'],
  imports: [CommonModule, FormsModule],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = {
    packageType: '',
    addOns: '',
    address: '',
    dateTime: '',
    washerName: '',
    washerEmail: '',
    washerId: 0
  };

  statusFilter: string = 'unassigned'; // default filter
  editMode: boolean = false;
  selectedOrderId: number | undefined;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // fetchOrders() {
  //   this.isLoading = true;
  //   this.errorMessage = '';
  //   this.customerService.getOrders(this.statusFilter).subscribe({
  //     next: (res) => {
  //       this.orders = res;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Failed to fetch orders';
  //       this.isLoading = false;
  //     }
  //   });
  // }
  fetchOrders() {
  this.isLoading = true;
  this.orders = []; // clear previous orders
  this.customerService.getOrders(this.statusFilter).subscribe({
    next: (res) => {
      this.orders = res;
      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.orders = []; // clear table if error
      this.isLoading = false;
    }
  });
}


  changeStatusFilter(status: string) {
    this.statusFilter = status;
    this.fetchOrders();
  }

  startEdit(order: Order) {
    this.editMode = true;
    this.selectedOrderId = order.orderId;
    this.newOrder = { ...order };
  }

  updateOrder() {
    if (!this.selectedOrderId) return;
    this.customerService.updateOrder(this.selectedOrderId, this.newOrder).subscribe({
      next: () => {
        alert('Order updated successfully!');
        this.resetForm();
        this.fetchOrders();
      },
      error: (err) => alert('Failed to update order: ' + err.message)
    });
  }

  deleteOrder(id: number) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    this.customerService.deleteOrder(id).subscribe({
      next: () => {
        alert('Order deleted successfully!');
        this.fetchOrders();
      },
      error: (err) => alert('Failed to delete order: ' + err.message)
    });
  }

  placeOrder() {
    this.customerService.placeOrder(this.newOrder).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.resetForm();
        this.fetchOrders();
      },
      error: (err) => alert('Failed to place order: ' + err.message)
    });
  }

  resetForm() {
    this.newOrder = {
      packageType: '',
      addOns: '',
      address: '',
      dateTime: '',
      washerName: '',
      washerEmail: '',
      washerId: 0
    };
    this.editMode = false;
    this.selectedOrderId = undefined;
  }
}
