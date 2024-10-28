import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../stores/starred.service';
import { DateFormatService } from '../../utils/dates.service';

@Component({
  selector: 'app-note-view',
  standalone: true,
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() note: any;
  isStarred: boolean = false;

  constructor(private notesStore: NotesService, private dateFormatService: DateFormatService) {}

  ngOnInit(): void {
    const savedStarredState = localStorage.getItem(`note-${this.note.note_id}-starred`);
    this.isStarred = savedStarredState ? savedStarredState === 'true' : this.note.starred;
  }

  toggleStar(): void {
    this.isStarred = !this.isStarred;

    if (this.isStarred) {
      this.notesStore.starNote(this.note.note_id);
    } else {
      this.notesStore.unstarNote(this.note.note_id);
    }

    localStorage.setItem(`note-${this.note.note_id}-starred`, String(this.isStarred));
  }

  formatDate(date: string): string {
    return this.dateFormatService.formatDate(date);
  }
}
