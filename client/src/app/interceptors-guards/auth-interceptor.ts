import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {
  private TOKEN_HEADER_KEY = 'x-access-token';

  constructor(private token: TokenStorageService) { }
  /** Intercept request and add header with token for backend auth*/
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(this.TOKEN_HEADER_KEY,token) });
    }
    return next.handle(authReq);
  }
}
/* "Barrel" of Http Interceptors */
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
