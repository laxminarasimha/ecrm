
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import {AuthGuard} from './auth.guard';

import {AlertService,AuthenticationService,UserService } from './_services/index';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppsidebarComponent } from './components/appsidebar/appsidebar.component';
import { GraphComponent } from './components/graph/graph.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppusersComponent } from './components/appusers/appusers.component';

@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppsidebarComponent,
    GraphComponent,
    DashboardComponent,
    AppusersComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MaterialModule
  ],
  providers: [UserService,AuthGuard,AlertService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
