import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import { NavbarComponent } from '../shared/component/navbar/navbar.component';
import { SidebarComponent } from '../shared/component/sidebar/sidebar.component';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgZorroAntdModule
  ]
})
export class LayoutModule { }
