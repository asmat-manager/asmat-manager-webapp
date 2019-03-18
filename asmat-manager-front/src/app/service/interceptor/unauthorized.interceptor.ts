import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NEVER, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Redirect to login page
        return NEVER;
      } else {
        return throwError(error);
      }
    }));
  }
}
