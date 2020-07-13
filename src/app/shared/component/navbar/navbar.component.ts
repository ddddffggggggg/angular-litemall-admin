import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private name: string = '';
  private avatar: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.name = this.userService.username;
    this.avatar = this.userService.useravatar;
  }

  log(): void {
    console.log('click dropdown button');
  }

}
