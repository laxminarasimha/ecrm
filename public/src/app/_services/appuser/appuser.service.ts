
import { Http } from '@angular/http';
import { User } from '../../user/user';
import { Injectable } from '@angular/core';
import {Observable } from "rxjs";
import "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class AppuserService {

  constructor(private _http: Http) { 
    //this.isUserLoggedIn = false;
  }

  create(user: User){
    return this._http.post("/api/newuser", user)
    .map(data => data.json());
  }

}
