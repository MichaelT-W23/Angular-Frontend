import { Injectable } from '@angular/core';
import { AxiosService } from '../lib/axios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  constructor(private apiService: AxiosService) {}

  public registerUser(userData: any): Observable<any> {
    return this.apiService.post('/users/register', userData);
  }

  public loginUser(userData: any): Observable<any> {
    return this.apiService.post('/users/login', userData);
  }

  public getUserByUsername(username: string): Observable<any> {
    return this.apiService.get(`/users/${username}`);
  }
}
