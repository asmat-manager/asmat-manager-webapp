import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NEVER, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastService} from '../toast.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toaster: ToastService,
              private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (!error.url.endsWith('/login') && error.status === 401) {
        this.toaster.open('Votre session a expirée, veuillez vous reconnecter.', 5000);
        this.authService.clearToken();
        this.router.navigate(['login']);
        return NEVER;
      } else {
        return throwError(error);
      }
    }));
  }
}
