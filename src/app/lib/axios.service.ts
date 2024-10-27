import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { tap } from 'rxjs';
import { AuthService } from '../stores/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private baseURL = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const accessToken = this.authService.getAccessToken();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (accessToken) {
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  }

  private handleError<T>(error: HttpErrorResponse, method: string, url: string): Observable<never | T> {
    if (error.status === 401 && error.error.message === 'Token expired') {

      return this.refreshAccessToken().pipe(
        switchMap(() => {
          const headers = this.getHeaders();

          return this.http.request<T>(method, url, { headers }).pipe(
            catchError((err) => this.handleError<T>(err, method, url))
          );
        })
      );
    } else {
      console.error('API call error:', error);
      return throwError(() => new Error(error.message || 'Server error'));
    }
  }

  private refreshAccessToken(): Observable<void> {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
  
    return this.http
      .post<{ access: string }>(`${this.baseURL}auth/refresh`, { refresh: refreshToken })
      .pipe(
        tap((response) => {
          this.authService.saveAccessToken(response.access);
        }),
        map(() => void 0),
        catchError((error) => {
          this.authService.logout();
          return throwError(() => new Error('Failed to refresh token'));
        })
      );
  }

  public get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.http.get<T>(url, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError<T>(error, 'GET', url)));
  }
  
  public post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.http.post<T>(url, body, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError<T>(error, 'POST', url)));
  }

}
