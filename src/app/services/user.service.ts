import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as jwtDecode from 'jwt-decode';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User, UserPayload } from '../models/user.model';
import Token from '../models/token.model';
import TokenPayload from '../models/token.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  userUrl = `${environment.apiUrl}/user`;
  currentUser = new Subject<User>();
  isLoggedInSub = new Subject<boolean>();
  private token: string;

  // currentUser = new Observable<User>((observer) => {
  //   const token = this.getToken();

  //   if (token) {
  //     observer.next(jwtDecode<User>(token));
  //   } else {
  //     observer.next(null);
  //   }

  //   observer.complete();
  // });

  // isLoggedInObs = new Observable<boolean>((observer) => {
  //   this.currentUser.subscribe(user => {
  //     if (user) {
  //       observer.next(user.exp > Date.now() / 1000);
  //     } else {
  //       observer.next(false);
  //     }

  //     observer.complete();
  //   });
  // });

  constructor(
    private http: HttpClient
  ) { }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }

    return this.token;
  }

  private deleteToken(): void {
    this.token = '';
    localStorage.removeItem('token');
  }

  private setCurrentUser(): void {
    const token = this.getToken();

    if (token) {
      this.currentUser.next(jwtDecode<User>(token));
    } else {
      this.currentUser.next(null);
    }
  }

  private setIsLoggedIn(): void {
      if (this.currentUser) {
        this.isLoggedInSub.next(user.exp > Date.now() / 1000);
      } else {
        this.isLoggedInSub.next(false);
      }
  }

  public register(user: UserPayload): Observable<any> {
    return this.http
      .post(`${this.userUrl}/register`, user)
      .map(({ token }: Token) => {
        this.setToken(token);
        this.setCurrentUser();
      });
  }

  public login(user: UserPayload): Observable<any> {
    return this.http
      .post(`${this.userUrl}/login`, user)
      .map(({ token }: Token) => {
        this.setToken(token);
        this.setCurrentUser();
      });
  }

  public logout(): void {
    this.deleteToken();
  }
}
