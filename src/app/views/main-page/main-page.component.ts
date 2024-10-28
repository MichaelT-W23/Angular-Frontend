import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../stores/auth.service';
import { NoteCardComponent } from '../../components/notes-card/notes-card.component';
import { NotesService } from '../../services/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NoteCardComponent, CommonModule], // Import NoteViewComponent
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userNotes: any[] = [];
  userId!: number; // Define userId here

  constructor(private authStore: AuthService, private notesService: NotesService) {}

  ngOnInit(): void {
    this.userId = this.authStore.getUserId(); // Initialize userId in ngOnInit
    this.fetchUserNotes();
  }

  private fetchUserNotes(): void {
    // Use this.userId to refer to the initialized userId
    this.notesService.getAllUserNotes(this.userId).subscribe((notes: any[]) => {
      this.userNotes = notes;
    });
  }
}
