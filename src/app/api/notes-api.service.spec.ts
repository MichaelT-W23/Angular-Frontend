import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NotesAPIService } from './notes-api.service';
import { provideHttpClient } from '@angular/common/http';

describe('NotesAPIService', () => {
  let httpTestingController: HttpTestingController;
  let service: NotesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotesAPIService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NotesAPIService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
