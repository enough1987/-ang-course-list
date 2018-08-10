import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem('token');

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
