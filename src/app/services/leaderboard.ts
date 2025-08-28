import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Leaderboard {
  rank: number;
  washerEmail: string;
  averageRating: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private baseUrl = 'http://localhost:8080/admin/ratings/leaderboard'; // API Gateway or backend URL

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<Leaderboard[]> {
    const token = localStorage.getItem('token'); // Assuming JWT is stored here
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Leaderboard[]>(this.baseUrl, { headers });
  }
}
