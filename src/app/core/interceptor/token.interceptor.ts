import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, from } from "rxjs";
import {AuthService} from '@app/service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const accessToken =  this.authService.getUser();
    if (accessToken && !request.url.includes("no-auth")) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
