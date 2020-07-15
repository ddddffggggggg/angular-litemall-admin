import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public userTotal: number = 0;
  public goodsTotal: number = 0;
  public productTotal: number = 0;
  public orderTotal: number = 0;
  constructor(protected indexService: IndexService) { }

  ngOnInit(): void {
    //this.getData();
  }
  getData() {
    this.indexService.getInfo();
  }
}
