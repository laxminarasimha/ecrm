import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './components/graph/graph.component';
import { AppusersComponent } from './components/appusers/appusers.component';
import {AuthGuard} from './auth.guard'


const routes: Routes = [
  { path: '', component: HomeComponent, outlet: 'contentarea',canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,  outlet: 'contentarea', canActivate: [AuthGuard] },
  { path: 'graph', component: GraphComponent, outlet: 'contentarea', canActivate: [AuthGuard] },
  { path: 'appusers', component: AppusersComponent, outlet: 'contentarea', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }  
  /*{ path: '**', canActivate:[AuthGuard], component:NotFoundComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
