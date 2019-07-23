import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NEVER, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastService} from '../toast.service';

@Injectable()
export class NoConnectionInterceptor implements HttpInterceptor {

  constructor(private toaster: ToastService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.toaster.open('La connexion au serveur a échouée. ' +
          'Vérifiez votre connexion internet et réessayez.', 8000);
        return NEVER;
      } else {
        return throwError(error);
      }
    }));
  }
}
