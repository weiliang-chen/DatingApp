import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, 
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, catchError, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class jwtInterceptor implements HttpInterceptor {
  constructor(private accountService : AccountService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
          })
        }

      }
    })

    return next.handle(req)
  }
}
