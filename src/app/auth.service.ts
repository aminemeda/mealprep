// auth.service.ts

/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Replace with your Laravel API URL

  constructor(private http: HttpClient) {}

  private authTokenKey = 'auth_token';

  isAuthenticated(): boolean {
    // Check if the authentication token is present and not expired
    const authToken = localStorage.getItem(this.authTokenKey);

    // You might have more sophisticated logic here to check the token validity
    return !!authToken; // Returns true if the token is present
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {});
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }
}
*/
// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Replace with your Laravel API URL
  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem(this.authTokenKey);
    return !!authToken;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => throwError(error))
    );
  }

  extractToken(response: any): string | null {
    return response && response.token ? response.token : null;
  }

  register(userCredentials: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userCredentials).pipe(
      catchError((error) => throwError(error))
    );
  }

  getUserDetails(): Observable<any> {
    const authToken = localStorage.getItem(this.authTokenKey);

    if (authToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });

      return this.http.get(`${this.apiUrl}/user`, { headers }).pipe(
        catchError((error) => throwError(error))
      );
    } else {
      return throwError('No authentication token available.');
    }
  }
}
