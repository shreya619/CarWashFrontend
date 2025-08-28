import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WashPackage } from '../models/WashPackage';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PackageService {
  private baseUrl = 'http://localhost:8080/admin/wash-packages'; // via gateway

  constructor(private http: HttpClient) {}

  getAll(): Observable<WashPackage[]> {
    return this.http.get<WashPackage[]>(this.baseUrl);
  }

  getById(id: number): Observable<WashPackage> {
    return this.http.get<WashPackage>(`${this.baseUrl}/${id}`);
  }

  create(pkg: WashPackage): Observable<WashPackage> {
    return this.http.post<WashPackage>(this.baseUrl, pkg);
  }

  update(id: number, pkg: WashPackage): Observable<WashPackage> {
    return this.http.put<WashPackage>(`${this.baseUrl}/${id}`, pkg);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
