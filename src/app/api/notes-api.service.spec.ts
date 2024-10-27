import { TestBed } from '@angular/core/testing';

import { NotesAPIService } from './notes-api.service';

describe('NotesAPIService', () => {
  let service: NotesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
