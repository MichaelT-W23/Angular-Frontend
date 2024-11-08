import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StarredService {

  private notesSubject = new BehaviorSubject<any[]>(this.loadNotesFromLocalStorage());
  private starredStatusChangedSubject = new BehaviorSubject<void>(undefined);

  notes$ = this.notesSubject.asObservable();
  starredStatusChanged$ = this.starredStatusChangedSubject.asObservable();

  constructor() {
    this.notesSubject.subscribe(notes => this.saveNotesToLocalStorage(notes));
  }

  private loadNotesFromLocalStorage(): any[] {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  private saveNotesToLocalStorage(notes: any[]): void {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  initializeNotes(notes: any[]): void {
    const currentNotes = this.notesSubject.value;

    const mergedNotes = notes.map(note => {
      const existingNote = currentNotes.find(n => n.id === note.id);
      return existingNote ? existingNote : note;
    });

    this.notesSubject.next(mergedNotes);
  }

  addNote(note: Omit<any, 'starred'>): void {
    const notes = this.notesSubject.value;
    notes.push({ ...note, starred: true });
    this.notesSubject.next(notes);
  }

  removeNote(noteId: string): void {
    const notes = this.notesSubject.value.filter(note => note.id !== noteId);
    this.notesSubject.next(notes);
  }

  starNote(noteId: string): void {

    const notes = this.notesSubject.value.map(note =>
      note.id === noteId ? { ...note, starred: true } : note
    );

    this.notesSubject.next(notes);
    this.starredStatusChangedSubject.next();
    
    console.log(`Note with ID ${noteId} starred.`);
  }

  unstarNote(noteId: string): void {
    const notes = this.notesSubject.value.map(note =>
      note.id === noteId ? { ...note, starred: false } : note
    );

    this.notesSubject.next(notes);
    this.starredStatusChangedSubject.next();

    console.log(`Note with ID ${noteId} unstarred.`);
  }

  getStarredNotes(): any[] {
    return this.notesSubject.value.filter(note => note.starred);
  }

  getNumberOfStoredNotes(): number {
    return this.notesSubject.value.length;
  }

  isNoteStarred(note: any): boolean {
    const foundNote = this.notesSubject.value.find(n => n.id === note.id);
    return foundNote ? foundNote.starred : false;
  }

  clearAllStarredNotes(): void {
    const notes = this.notesSubject.value.map(note => ({ ...note, starred: false }));
    
    this.notesSubject.next(notes);
    this.starredStatusChangedSubject.next();
  }
  
}
