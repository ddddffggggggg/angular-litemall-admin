import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs/index';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  public username:string = 'admin123';
  public password:string = 'admin123';

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private loginService: LoginService) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  submitForm(value: { userName: string; password: string; }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    this.loginService.login(this.username, this.password)
      .subscribe( (result) => {
        this.loginSuccess(result);
      });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  loginSuccess(result) {
    console.log(result.data);
    const data = result.data;
    const token = data.token;
    const username = data.adminInfo.nickName;
    const userInfo = data.adminInfo;
    console.log(username);
    this.cookieService.set('token', token);
    this.cookieService.set('username', username);
    this.cookieService.set('userinfo', userInfo);
    this.router.navigate(['/']);
  }


}
