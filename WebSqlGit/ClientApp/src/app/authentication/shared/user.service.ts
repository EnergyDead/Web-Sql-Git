import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private authorizeUrl = 'api/accounts';
  httpOptions = {
    headers: new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Cache-Control", "no-cache")
      .set('Pragma', 'no-cache')
      .set('Expires', new Date(new Date().setMinutes(new Date().getMinutes() - 1)).toUTCString())
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
      .set('Access-Control-Allow-Credentials', 'true')
  };

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    const url = `${this.authorizeUrl}/registration`;
    return this.http.post<User>(url, user, this.httpOptions);
  }

  authorizationUser(user: User): Observable<User> {
    return this.http.post<User>(this.authorizeUrl, user, this.httpOptions);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.authorizeUrl)
  }

  getUsers(): Observable<User[]> {
    const url = `${this.authorizeUrl}/all`;
    return this.http.get<User[]>(url)
  }

  outUser(): Observable<User> {
    const url = `${this.authorizeUrl}/logout`;
    return this.http.get<User>(url, { withCredentials: true })
  }
}
