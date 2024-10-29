import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});