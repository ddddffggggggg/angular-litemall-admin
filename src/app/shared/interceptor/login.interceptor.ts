import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { catchError, retry } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: any;
    // 实现不拦截的方式：1. 指定接口不拦截  2. 判断本地sessionStorage
    if (!req.url.includes('login')) {
      const token = this.cookieService.get('token');
      const username = this.cookieService.get('username');
      console.log(token + username);
      authReq = req.clone({ setHeaders: {  token, username } });
      return next.handle(authReq).pipe(
        mergeMap((event: any) => {
          // 允许统一对请求错误处理
          if (event instanceof HttpResponse) {
            const body: any = event.body;
            console.log(body);
            if (body.code !== 200) {
              // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
              // this.http.get('/').subscribe() 并不会触发
              if (body.code === 401) {// token过期，并且无法刷新，需要重新登录
                this.router.navigate(['/login']);
              } else if (body.code === 100) {// token过期，服务器端自动刷新了token，需要用新的token重新发送请求
                const newToken = body.token;
                this.cookieService.set('token', newToken);
                console.log('new token: ' + newToken);
                authReq = req.clone({ setHeaders: {  token: newToken, username } });
                return next.handle(authReq).pipe();
              }
              return throwError({});
            } else {
              // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
              // return of(new HttpResponse(Object.assign(event, { body: body.response })));
              // 或者依然保持完整的格式
              return of(event);
            }
          } else {
            return of(event);
          }
        }),
        catchError((err: HttpErrorResponse) => this.handleData(err))
      );
    }
    authReq = req.clone();
    return next.handle(authReq);
  }
  private handleData(ev: HttpResponseBase): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    console.log(ev.status);
    return of(ev);
  }
}
