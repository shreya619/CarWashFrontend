import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WasherDTO {
  email: string;
  username: string;
  phoneNo: string;
  password: string;
}

export interface FeedbackDTO {
  id?: number;
  orderId: number;
  waterSaved: number;
  notes: string;
  washerEmail?: string;
}

export interface Order {
  orderId: number;
  customerName: string;
  customerEmail: string;
  phoneNo: string;
  packageType: string;
  addOns: string;
  address: string;
  dateTime: string; // LocalDateTime from backend as ISO string
  status: string;   // pending, started, in-progress, completed
  washerName: string;
  washerEmail: string;
  washerId: number;
}

export interface WasherIndividualRatingDTO {
  customerEmail: string;
  rating: number;
  review: string;
}

@Injectable({
  providedIn: 'root'
})
export class WasherService {
  private apiUrl = 'http://localhost:8080/api/washers'; // your washer service URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getProfile(): Observable<WasherDTO> {
    return this.http.get<WasherDTO>(`${this.apiUrl}/profile`, { headers: this.getAuthHeaders() });
  }

  updateProfile(dto: WasherDTO): Observable<string> {
    return this.http.put(`${this.apiUrl}/update`, dto, { headers: this.getAuthHeaders(), responseType: 'text' });
  }



  sendInvoice(dto: any): Observable<string> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  return this.http.post(`${this.apiUrl}/send`, dto, { headers, responseType: 'text' });
}


getMyRatings(): Observable<WasherIndividualRatingDTO[]> {
    return this.http.get<WasherIndividualRatingDTO[]>(`${this.apiUrl}/rating/my-ratings`, {
      headers: this.getAuthHeaders()
    });
  }




getOrders(type: string): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.apiUrl}/orders?type=${type}`, {
    headers: this.getAuthHeaders()
  });
}

updateOrderStatus(orderId: number, newStatus: string): Observable<Order> {
  return this.http.put<Order>(`${this.apiUrl}/orders/${orderId}/status?newStatus=${newStatus}`, {}, {
    headers: this.getAuthHeaders()
  });
}


 getAllFeedbacks(): Observable<FeedbackDTO[]> {
    return this.http.get<FeedbackDTO[]>(`${this.apiUrl}/feedback/all`, { headers: this.getAuthHeaders() });
  }

  getFeedbackById(feedbackId: number): Observable<FeedbackDTO> {
    return this.http.get<FeedbackDTO>(`${this.apiUrl}/feedback/${feedbackId}`, { headers: this.getAuthHeaders() });
  }

  getFeedbackByOrder(orderId: number): Observable<FeedbackDTO> {
    return this.http.get<FeedbackDTO>(`${this.apiUrl}/orders/${orderId}/feedback`, { headers: this.getAuthHeaders() });
  }

  submitFeedback(orderId: number, dto: FeedbackDTO): Observable<string> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/feedback`, dto, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  editFeedback(feedbackId: number, dto: FeedbackDTO): Observable<string> {
    return this.http.put(`${this.apiUrl}/feedback/${feedbackId}/edit`, dto, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  deleteFeedback(feedbackId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/feedback/${feedbackId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }


   deleteAccount(): Observable<string> {
  return this.http.delete(`${this.apiUrl}/delete`, {
    headers: this.getAuthHeaders(),
    responseType: 'text'  // 👈 important: backend returns plain string
  });
}
}
