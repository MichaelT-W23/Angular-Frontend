import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../stores/starred.service';
import { DateFormatService } from '../../utils/dates.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {
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
