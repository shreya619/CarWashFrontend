
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Java backend URL
private tokenKey = 'token'; // 

  constructor(private http: HttpClient, private router: Router) {}

 
    login(email: string, password: string, role: string) {
  let endpoint = '';
  if (role === 'admin') endpoint = '/auth/login';
  else if (role === 'customer') endpoint = '/api/customers/login';
  else if (role === 'washer') endpoint = '/api/washers/login'; // if implemented later

  return this.http.post(`${this.baseUrl}${endpoint}`, { email, password }, { responseType: 'text' });
}

registerCustomer(data: any) {
  return this.http.post(`${this.baseUrl}/api/customers/register`, data, { responseType: 'text' });
}


  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  saveToken(token: string) {
  if (token && token.includes('.') && token.split('.').length === 3) {
    localStorage.setItem(this.tokenKey, token);
  } else {
    console.warn('⚠️ Invalid token format. Not saving to storage:', token);
  }
}


 
    getToken(): string | null {
  const token = localStorage.getItem(this.tokenKey);
  return token && token !== 'null' ? token : null;
}


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

