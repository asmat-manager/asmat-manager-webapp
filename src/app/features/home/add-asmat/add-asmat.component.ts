import { Component } from '@angular/core';
import { Asmat } from '../../../model/asmat';
import { AsmatService } from '../../../service/asmat.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../service/toast.service';
import { NEVER, throwError } from 'rxjs';
import { NavbarUpdateService } from '../../../service/navbar-update.service';

@Component({
  selector: 'app-add-asmat',
  templateUrl: './add-asmat.component.html',
  styleUrls: ['./add-asmat.component.scss']
})
export class AddAsmatComponent {

  constructor(private asmatService: AsmatService,
              private navbarUpdateService: NavbarUpdateService,
              private router: Router,
              private toaster: ToastService) {
  }

  public onAsmatSubmitted(asmat: Asmat) {
    this.asmatService.create(asmat)
      .pipe(
        catchError(this.handleHttpError.bind(this)),
        tap(() => this.navbarUpdateService.update())
      )
      .subscribe(() => this.router.navigate(['home']));
  }

  private handleHttpError(error: HttpErrorResponse) {
    const {error: {message}, status} = error;
    if (status === 400) {
      this.toaster.open(message, 5000);
      return NEVER;
    } else {
      return throwError(error);
    }
  }
}
