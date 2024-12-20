import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../stores/auth.service';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { NotesService } from '../../services/notes.service';
import { CommonModule } from '@angular/common';
import { StarredService } from '../../stores/starred.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NoteCardComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userNotes: any[] = [];
  userId!: number;

  constructor(
    private authStore: AuthService, 
    private notesService: NotesService, 
    private starredService: StarredService
  ) {}
  
  ngOnInit(): void {
    this.userId = this.authStore.getUserId();
    this.fetchUserNotes();
  }
  
  trackByNoteId(index: number, note: any): string {
    return note.id;
  }
  
  private fetchUserNotes(): void {
    this.notesService.getAllUserNotes(this.userId).subscribe((notes: any[]) => {
      this.userNotes = notes;
      this.authStore.setNotes(this.userNotes);
      this.starredService.initializeNotes(notes);
    });
  }

}