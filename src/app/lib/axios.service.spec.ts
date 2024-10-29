import { TestBed } from '@angular/core/testing';
import { AxiosService } from './axios.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AxiosService', () => {
  let service: AxiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(AxiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
