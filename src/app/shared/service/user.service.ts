import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userInfo: object = {};
  public username: string = '未登录';
  public useravatar: string = '';
  constructor(private cookieService: CookieService) {
    if ( this.cookieService.get('username') && this.cookieService.get('useravatar') ) {
      this.username = this.cookieService.get('username');
      this.useravatar = this.cookieService.get('useravatar');
    }
  }
  // this.userservice.userInfo = userInfo;
  // this.userservice.username = username;
  // this.userservice.useravatar =  avatar;
}
