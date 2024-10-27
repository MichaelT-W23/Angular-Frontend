import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Note {
  note_id: string;
  content: string;
  starred: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>(this.loadNotesFromLocalStorage());
  notes$ = this.notesSubject.asObservable();

  constructor() {
    this.notesSubject.subscribe(notes => this.saveNotesToLocalStorage(notes));
  }

  private loadNotesFromLocalStorage(): Note[] {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  private saveNotesToLocalStorage(notes: Note[]): void {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  addNote(note: Omit<Note, 'starred'>): void {
    const notes = this.notesSubject.value;
    notes.push({ ...note, starred: true });
    this.notesSubject.next(notes);
  }

  removeNote(noteId: string): void {
    const notes = this.notesSubject.value.filter(note => note.note_id !== noteId);
    this.notesSubject.next(notes);
  }

  starNote(noteId: string): void {
    const notes = this.notesSubject.value.map(note =>
      note.note_id === noteId ? { ...note, starred: true } : note
    );
    this.notesSubject.next(notes);
    console.log(`Note with ID ${noteId} starred.`);
  }

  unstarNote(noteId: string): void {
    const notes = this.notesSubject.value.map(note =>
      note.note_id === noteId ? { ...note, starred: false } : note
    );
    this.notesSubject.next(notes);
    console.log(`Note with ID ${noteId} unstarred.`);
  }

  getStarredNotes(): Note[] {
    return this.notesSubject.value.filter(note => note.starred);
  }

  getNumberOfStoredNotes(): number {
    return this.notesSubject.value.length;
  }

  isNoteStarred(note: Note): boolean {
    const foundNote = this.notesSubject.value.find(n => n.note_id === note.note_id);
    return foundNote ? foundNote.starred : false;
  }
}
