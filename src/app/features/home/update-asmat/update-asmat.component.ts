import { Component, OnInit } from '@angular/core';
import { AsmatService } from '../../../service/asmat.service';
import { Asmat } from '../../../model/asmat';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NEVER, throwError } from 'rxjs';
import { ToastService } from '../../../service/toast.service';
import { NavbarUpdateService } from '../../../service/navbar-update.service';

@Component({
  selector: 'app-update-asmat',
  templateUrl: './update-asmat.component.html',
  styleUrls: ['./update-asmat.component.scss']
})
export class UpdateAsmatComponent implements OnInit {

  public asmat: Asmat;

  constructor(private asmatService: AsmatService,
              private navbarUpdateService: NavbarUpdateService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastService) {
    this.asmat = null;
  }

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.asmatService.getById(id)
      .subscribe(asmat => this.asmat = asmat);
  }

  public onAsmatSubmitted(asmat: Asmat) {
    this.asmatService.update(asmat)
      .pipe(
        catchError(this.handleHttpError.bind(this)),
        tap(() => this.navbarUpdateService.update())
      )
      .subscribe(() => this.router.navigate(['home', 'asmats']));
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
