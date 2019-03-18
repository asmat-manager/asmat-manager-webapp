import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  private readonly TOKEN_KEY = 'ASMAT_MANAGER_TOKEN';

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
