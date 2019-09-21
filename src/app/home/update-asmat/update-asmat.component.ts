import {Component, OnInit} from '@angular/core';
import {AsmatService} from '../../service/asmat.service';
import {Asmat} from '../../model/asmat';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {NEVER, throwError} from 'rxjs';
import {ToastService} from '../../service/toast.service';

@Component({
  selector: 'app-update-asmat',
  templateUrl: './update-asmat.component.html',
  styleUrls: ['./update-asmat.component.scss']
})
export class UpdateAsmatComponent implements OnInit {

  public asmat: Asmat;

  constructor(private asmatService: AsmatService,
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
    this.asmatService.update(asmat).pipe(catchError((err: HttpErrorResponse) => {
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
