import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAPIService } from '../api/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userApiService: UserAPIService) {}

  public createNewUser(userData: any): Observable<any> {
    return this.userApiService.registerUser(userData);
  }

  public loginExistingUser(userData: any): Observable<any> {
    return this.userApiService.loginUser(userData);
  }

  public getUser(username: string): Observable<any> {
    return this.userApiService.getUserByUsername(username);
  }
}
