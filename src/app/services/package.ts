/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Package {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WashPackage } from '../models/WashPackage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl = 'http://localhost:8080/admin/wash-packages';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
  }

  getAll(): Observable<WashPackage[]> {
    return this.http.get<WashPackage[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  create(pkg: WashPackage): Observable<WashPackage> {
    return this.http.post<WashPackage>(this.baseUrl, pkg, { headers: this.getHeaders() });
  }

  update(id: number, pkg: WashPackage): Observable<WashPackage> {
    return this.http.put<WashPackage>(`${this.baseUrl}/${id}`, pkg, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}

