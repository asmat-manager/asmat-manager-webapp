import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NEVER, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastService} from '../toast.service';
import { MatDialog } from '@angular/material/dialog';
import {ServerErrorModalComponent} from '../../server-error-modal/server-error-modal.component';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        this.dialog.open(ServerErrorModalComponent, {
          hasBackdrop: true,
          position: {
            top: '20vh'
          },
          width: '80%',
          maxWidth: '600px'
        });
        return NEVER;
      } else {
        return throwError(error);
      }
    }));
  }
}
