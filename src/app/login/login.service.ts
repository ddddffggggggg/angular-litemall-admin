import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string = '/studentmanage/login';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    const options = { username, password };
    return this.http.post<string>(this.loginUrl,  httpOptions)
      .pipe(
        //catchError(this.handleError('login', username))
      );
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     return of( result as T );
  //   };
  // }
}
