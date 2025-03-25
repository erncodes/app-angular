import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth-.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  authService : AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler){
    
   return this.authService.loggedUserSubject.pipe(take(1),exhaustMap(user =>{
    if(!user){
      return next.handle(req);
    }
      const modifiedReq = req.clone({ params : new HttpParams().set('auth', user.token)})
      return next.handle(modifiedReq);
    }))

  }
}
