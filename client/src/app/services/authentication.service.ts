import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://localhost:5000/customers/auth/';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + 'signin',{email,password}, this.httpOptions)
      .pipe(
        tap(_ => console.log('signed in')),
    );
  }

  register(name: string, email: string, adress: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + 'signup', { name, email, adress, password}, this.httpOptions)
      .pipe(
        tap(_ => console.log('registered')),
    );
  }

}
