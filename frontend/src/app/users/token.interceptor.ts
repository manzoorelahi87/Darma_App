import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private cache: Map<HttpRequest, HttpResponse> = new Map();
  
  constructor(private service: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let getToken = this.service.getToken();
    let setheadertoken = request.clone({
      setHeaders: {
        token: `${getToken}`
      }
    });
    return next.handle(setheadertoken);
  }
}
