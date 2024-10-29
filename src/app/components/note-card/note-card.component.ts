import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { StarredService } from '../../stores/starred.service';
import { DateFormatService } from '../../utils/date-format.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-note-card',
  standalone: true,
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit, OnDestroy {
  @Input() note: any;
  @Output() starStatusChanged = new EventEmitter<string>();
  
  isStarred: boolean = false;
  private starredStatusSubscription!: Subscription;

  constructor(
    private starredNotes: StarredService,
    private dateFormatService: DateFormatService
  ) {}

  ngOnInit(): void {
    const savedStarredState = localStorage.getItem(`note-${this.note.id}-starred`);
    this.isStarred = savedStarredState ? savedStarredState === 'true' : this.note.starred;

    this.starredStatusSubscription = this.starredNotes.starredStatusChanged$.subscribe(() => {
      this.isStarred = this.starredNotes.isNoteStarred(this.note);
    });
  }

  ngOnDestroy(): void {
    this.starredStatusSubscription?.unsubscribe();
  }

  toggleStar(): void {
    this.isStarred = !this.isStarred;

    if (this.isStarred) {
      this.starredNotes.starNote(this.note.id);
    } else {
      this.starredNotes.unstarNote(this.note.id);
      this.starStatusChanged.emit(this.note.id);
    }

    localStorage.setItem(`note-${this.note.id}-starred`, String(this.isStarred));
  }

  formatDate(date: string): string {
    return this.dateFormatService.formatDate(date);
  }

}
