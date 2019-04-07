import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AppConfig} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private readonly TOKEN_KEY = 'ASMAT_MANAGER_TOKEN';

  constructor(private http: HttpClient) {
  }

  public login(user: { username: string, password: string }): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/login`, user, {
      observe: 'response'
    }).pipe(
      tap((response: HttpResponse<any>) => {
        this.token = response.headers.get('Authorization').replace('Bearer ', '');
      })
    );
  }

  public get token(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public set token(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public clearToken() {
    this.token = '';
  }
}
