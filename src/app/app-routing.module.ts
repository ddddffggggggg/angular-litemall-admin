import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import( './layout/layout.module').then(layout => layout.LayoutModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(login => login.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
