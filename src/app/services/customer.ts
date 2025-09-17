
import { FormsModule } from '@angular/forms';   // ✅ Import this

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomerLeaderboard } from '../components/customer/models/customer-leaderboard.model';
import { WashPackage } from '../models/WashPackage';
import { Washer } from '../models/washer.model';
import { FeedbackDTO } from '../models/FeedbackDTO';
import { RatingRequestDTO } from '../models/RatingRequestDTO';
import { WasherRatingDTO } from '../models/WasherRatingDTO';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCustomerProfile(): Observable<any> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get(`${this.baseUrl}/profile`, { headers });
    } catch (err) {
      return throwError(() => err);
    }
  }

  updateProfile(customer: any): Observable<string> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.put(`${this.baseUrl}/update`, customer, {
        headers,
        responseType: 'text'
      });
    } catch (err) {
      return throwError(() => err);
    }
  }

getFeedback(orderId: number): Observable<FeedbackDTO> {
    return this.http.get<FeedbackDTO>(`${this.baseUrl}/orders/${orderId}/feedback`, {
      headers: this.getAuthHeaders()
    });
  }

  // Submit rating
  submitRating(orderId: number, dto: RatingRequestDTO): Observable<string> {
    return this.http.post(`${this.baseUrl}/orders/${orderId}/rate`, dto, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  // View all washer ratings
  getAllWasherRatings(): Observable<WasherRatingDTO[]> {
    return this.http.get<WasherRatingDTO[]>(`${this.baseUrl}/washers/ratings`, {
      headers: this.getAuthHeaders()
    });
  }
getAllWashPackages(): Observable<WashPackage[]> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.get<WashPackage[]>(`${this.baseUrl}/view-wash-packages`, { headers });
}


getAllWashers(): Observable<Washer[]> {
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  return this.http.get<Washer[]>(`${this.baseUrl}/washers/all`, { headers });
}

// Add this method inside CustomerService

// src/app/services/customer.service.ts

 initiatePayment(amount: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/pay?amount=${amount}`, {});
}


 getLeaderboard(): Observable<CustomerLeaderboard[]> {
    try {
      const headers = this.getAuthHeaders();
          return this.http.get<CustomerLeaderboard[]>(`${this.baseUrl}/washers/leaderboard`, { headers });

    } catch (err) {
      return throwError(() => err);
    }
  }


  // src/app/services/customer.ts (order-related methods)

// Place order -> expect created Order back
placeOrder(orderData: any): Observable<any> {
  const token = localStorage.getItem('token'); // ✅ get token after login
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`${this.baseUrl}/place-order`, orderData, { headers });
}


// Get orders (returns array of Orders)
getOrders(status: string): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.baseUrl}/orders?status=${status}`, {
    headers: this.getAuthHeaders()
  });
}

// Update order -> expect updated Order back
updateOrder(id: number, order: Order): Observable<Order> {
  return this.http.put<Order>(`${this.baseUrl}/orders/${id}`, order, {
    headers: this.getAuthHeaders()
  });
}

// Delete order -> if backend returns no body, use void; if it returns message, use string
deleteOrder(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/orders/${id}`, {
    headers: this.getAuthHeaders()
    
  });
}









  deleteProfile(): Observable<string> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.delete(`${this.baseUrl}/delete`, {
        headers,
        responseType: 'text'
      });
    } catch (err) {
      return throwError(() => err);
    }
  }
}
