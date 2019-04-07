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

  public getAllByCity(city: string): Observable<Asmat[]> {
    return this.http.get<Asmat[]>(`${AppConfig.API_URL}/asmats?city=${city}`);
  }

  public getById(id: number): Observable<Asmat> {
    return this.http.get<Asmat>(`${AppConfig.API_URL}/asmats/${id}`);
  }

  public getCities(): Observable<string[]> {
    return this.http.get<string[]>(`${AppConfig.API_URL}/asmats/cities`);
  }

  public create(asmat: Asmat): Observable<Asmat> {
    return this.http.post<Asmat>(`${AppConfig.API_URL}/asmats`, asmat);
  }

  public update(asmat: Asmat): Observable<Asmat> {
    return this.http.put<Asmat>(`${AppConfig.API_URL}/asmats/${asmat.id}`, asmat);
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${AppConfig.API_URL}/asmats/${id}`);
  }
}
