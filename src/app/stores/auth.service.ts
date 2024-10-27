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

  login(userData: { user: { id: string; username: string; email: string }, access: string, refresh: string }) {
    const updatedUser = {
      ...this.userSubject.value,
      username: userData.user.username,
      email: userData.user.email,
      userId: userData.user.id,
      accessToken: userData.access,
      refreshToken: userData.refresh,
    };

    this.userSubject.next(updatedUser);

    localStorage.setItem('username', userData.user.username);
    localStorage.setItem('email', userData.user.email);
    localStorage.setItem('userId', userData.user.id);
    localStorage.setItem('accessToken', userData.access);
    localStorage.setItem('refreshToken', userData.refresh);
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
