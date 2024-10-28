import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>({
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    userId: localStorage.getItem('userId') || null,
    notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    tags: localStorage.getItem('tags') ? localStorage.getItem('tags')!.split(',') : [],
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  });

  user$ = this.userSubject.asObservable();

  constructor() {}

  login(userData: { username: string; password: string }): Promise<{ user: { id: string; username: string; email: string }; access: string; refresh: string }> {
    return new Promise((resolve, reject) => {
      
      const response = {
        user: {
          id: '123',
          username: userData.username,
          email: `${userData.username}@example.com`,
        },
        access: 'access_token_example',
        refresh: 'refresh_token_example',
      };
  
      try {
        this.userSubject.next(response);

        localStorage.setItem('username', response.user.username);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);

        resolve(response);
      } catch (error) {
        reject(error);
      }
      
    });
  }
  
  logout() {
    const resetUser = { username: null, email: null, userId: null, notes: [], tags: [], accessToken: null, refreshToken: null };
    this.userSubject.next(resetUser);

    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('notes');
    localStorage.removeItem('tags');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  getUsername() {
    return this.userSubject.value.username || localStorage.getItem('username');
  }

  getEmail() {
    return this.userSubject.value.email || localStorage.getItem('email');
  }

  setUserId(id: string) {
    const updatedUser = { ...this.userSubject.value, userId: id };
    this.userSubject.next(updatedUser);
    localStorage.setItem('userId', id);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setNotes(notes: any[]) {
    const updatedUser = { ...this.userSubject.value, notes };
    this.userSubject.next(updatedUser);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  getNotes() {
    return JSON.parse(localStorage.getItem('notes') || '[]');
  }

  setTags(tags: string[]) {
    const updatedUser = { ...this.userSubject.value, tags };
    this.userSubject.next(updatedUser);
    localStorage.setItem('tags', tags.join(','));
  }

  getTags() {
    return localStorage.getItem('tags') ? localStorage.getItem('tags')!.split(',') : [];
  }

  getAccessToken() {
    return this.userSubject.value.accessToken || localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return this.userSubject.value.refreshToken || localStorage.getItem('refreshToken');
  }

  saveAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
}
