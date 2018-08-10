import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService } from '../../core/services';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let localStorage: LocalStorageService;
  let service: DataService;
  let httpTestingController: HttpTestingController;

  const localStorageStub = {
    getItem: () => 'token123456',
  };

  @Injectable()
  class DataService {
    constructor(private http: HttpClient) {}

    getData() {
      return this.http.get('http://base.url/api');
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        DataService,
        { provide: LocalStorageService, useValue: localStorageStub },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });

    interceptor = TestBed.get(AuthInterceptor);
    service = TestBed.get(DataService);
    localStorage = TestBed.get(LocalStorageService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization header to requests', () => {
    service.getData().subscribe(response => {
      expect(response).toBe('OK');
    });

    const req = httpTestingController.expectOne('http://base.url/api');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    req.flush('OK');
  });

  it('should pass the request through if no token is stored in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.getData().subscribe(response => {
      expect(response).toBe('OK');
    });

    const req = httpTestingController.expectOne('http://base.url/api');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush('OK');
  });

});
