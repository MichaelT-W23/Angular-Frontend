import { TestBed } from '@angular/core/testing';

import { UserAPIService } from './user-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UserAPIService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAPIService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserAPIService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
