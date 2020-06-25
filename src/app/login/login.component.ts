import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs/index';

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

  constructor(private fb: FormBuilder, private cookieService: CookieService) {
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
    console.log(this.validateForm.controls);
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }


}
