import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';
//component: LayoutComponent,
const routes: Routes = [
  { path: '', redirectTo: '/layout/index' },
  { path: 'layout', component: LayoutComponent,  canActivate: [AuthGuard],
    children: [
      { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
