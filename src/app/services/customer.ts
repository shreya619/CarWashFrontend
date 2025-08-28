/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Customer {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomerLeaderboard } from '../components/customer/models/customer-leaderboard.model';
import { WashPackage } from '../models/WashPackage';
import { Washer } from '../models/washer.model';
import { FeedbackDTO } from '../models/FeedbackDTO';
import { RatingRequestDTO } from '../models/RatingRequestDTO';
import { WasherRatingDTO } from '../models/WasherRatingDTO';
import { OrderRequestDTO } from '../models/OrderRequestDTO';

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
payForWash(amount: number): Observable<string> {
  const headers = this.getAuthHeaders();
  return this.http.post(`${this.baseUrl}/pay?amount=${amount}`, {}, {
    headers,
    responseType: 'text' // returns Razorpay order info as string
  });
}


 getLeaderboard(): Observable<CustomerLeaderboard[]> {
    try {
      const headers = this.getAuthHeaders();
          return this.http.get<CustomerLeaderboard[]>(`${this.baseUrl}/washers/leaderboard`, { headers });

    } catch (err) {
      return throwError(() => err);
    }
  }




placeOrder(order: OrderRequestDTO): Observable<string> {
    return this.http.post(`${this.baseUrl}/place-order`, order, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  // Get orders filtered by status: unassigned/current/past
  getOrders(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders?status=${status}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update order
  updateOrder(id: number, order: OrderRequestDTO): Observable<string> {
    return this.http.put(`${this.baseUrl}/orders/${id}`, order, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  // Delete order
  deleteOrder(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/orders/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
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
