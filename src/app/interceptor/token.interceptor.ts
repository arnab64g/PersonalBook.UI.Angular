import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService : UserService) {}

  intercept(httpRequest: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getToken();

    if(token){
      httpRequest = httpRequest.clone({
        headers: httpRequest.headers.set('Authorization',  'Bearer ' + token) 
        });
    }

    return httpHandler.handle(httpRequest);
  }
}
