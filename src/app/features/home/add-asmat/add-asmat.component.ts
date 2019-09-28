import {Component} from '@angular/core';
import {Asmat} from '../../../model/asmat';
import {AsmatService} from '../../../service/asmat.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../service/toast.service';
import {NEVER, throwError} from 'rxjs';

@Component({
  selector: 'app-add-asmat',
  templateUrl: './add-asmat.component.html',
  styleUrls: ['./add-asmat.component.scss']
})
export class AddAsmatComponent {

  constructor(private asmatService: AsmatService,
              private router: Router,
              private toaster: ToastService) {
  }

  public onAsmatSubmitted(asmat: Asmat) {
    this.asmatService.create(asmat)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.toaster.open(err.error.message, 5000);
          return NEVER;
        } else {
          return throwError(err);
        }
      }))
      .subscribe(() => this.router.navigate(['home']));
  }
}
