import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http:  HttpClient) { }

  loginUser(email: string, password: string): Observable<{ token: string }> {
    const loginData = { email, password }; // Cambia "username" por "email"
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData);
  }
  


}
