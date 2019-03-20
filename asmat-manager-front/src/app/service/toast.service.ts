import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asmat} from '../model/asmat';
import {AppConfig} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar) {
  }

  public open(message: string, duration: number = 3000) {
    this.snackbar.open(message, 'OK', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

}
