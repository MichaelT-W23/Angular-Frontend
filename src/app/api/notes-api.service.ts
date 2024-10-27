import { Injectable } from '@angular/core';
import { AxiosService } from '../lib/axios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesAPIService {
  constructor(private apiService: AxiosService) {}

  public getUserNotes(userId: string): Observable<any> {
    return this.apiService.get(`/notes/users/${userId}/notes`);
  }

  public getNotesByTag(tagName: string): Observable<any> {
    return this.apiService.get(`/notes/tag/${tagName}`);
  }

  public getAllTags(userId: string): Observable<any> {
    return this.apiService.get(`/notes/users/${userId}/tag`);
  }

}
