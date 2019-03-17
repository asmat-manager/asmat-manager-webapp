import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asmat} from '../model/asmat';
import {AppConfig} from '../../environments/environment';

@Injectable()
export class AsmatService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Asmat[]> {
    return this.http.get<Asmat[]>(`${AppConfig.API_URL}/asmats`);
  }

  public getById(id: number): Observable<Asmat> {
    return this.http.get<Asmat>(`${AppConfig.API_URL}/asmats/${id}`);
  }

  public create(asmat: Asmat): Observable<Asmat> {
    return this.http.post<Asmat>(`${AppConfig.API_URL}/asmats`, asmat);
  }
}
