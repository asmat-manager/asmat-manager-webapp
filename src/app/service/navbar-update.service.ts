import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NavbarUpdateService {
  private navbarUpdateSubject: BehaviorSubject<any>;
  public readonly navbarUpdate: Observable<any>;

  constructor() {
    this.navbarUpdateSubject = new BehaviorSubject<any>();
    this.navbarUpdate = this.navbarUpdateSubject.asObservable();
  }

  public update() {
    this.navbarUpdateSubject.next();
  }
}
