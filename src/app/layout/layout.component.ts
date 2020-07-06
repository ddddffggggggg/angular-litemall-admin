import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/component/header/header.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('header已经加载');
  }

}
