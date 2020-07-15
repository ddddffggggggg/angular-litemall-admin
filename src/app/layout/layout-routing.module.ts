import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';
//component: LayoutComponent,
//canActivate: [AuthGuard],
//redirectTo: '/layout/index',
const routes: Routes = [

  { path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'index' },
      { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
