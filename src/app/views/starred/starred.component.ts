import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { StarredService } from '../../stores/starred.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starred',
  standalone: true,
  imports: [CommonModule, NoteCardComponent],
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css']
})
export class StarredComponent implements OnInit {
  starredNotes: any[] = [];

  constructor(private starredService: StarredService) {}

  ngOnInit(): void {
    this.starredNotes = this.starredService.getStarredNotes();
  }

  onStarStatusChanged(noteId: string): void {
    this.starredNotes = this.starredNotes.filter(note => note.id !== noteId);
  }
  
}
