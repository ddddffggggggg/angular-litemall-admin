import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLogin: boolean;
    // 判断用户是否登录
    const token = this.cookieService.get('token');
    if (!token) {
      isLogin = false;
      // 未登录跳转到登录界面
      this.router.navigateByUrl('/login');
    } else {
      isLogin = true;
    }
    return isLogin;
  }

}
