import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { NotesAPIService } from '../api/notes-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private notesApiService: NotesAPIService) {}
  
  public getAllUserNotes(userId: number): Observable<any> {
    return from(this.notesApiService.getUserNotes(userId));
  }

  public getNotesByTagName(tagName: string): Observable<any> {
    return from(this.notesApiService.getNotesByTag(tagName));
  }

  public getAllUserTags(userId: number): Observable<any> {
    return from(this.notesApiService.getAllTags(userId));
  }
}
