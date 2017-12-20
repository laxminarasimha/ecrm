import { Http } from '@angular/http';
import { User } from '../user/user';
import { Injectable } from '@angular/core';
import {Observable } from "rxjs";
import "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  //private isUserLoggedIn;
  private username;
  constructor(private _http: Http) { 
    //this.isUserLoggedIn = false;
  }

  create(user: User){
    return this._http.post("/users", user)
    .map(data => data.json()).toPromise()
  }

  destroy(_id: String){
    return this._http.delete("/users/"+_id)
    .map(data => data.json()).toPromise()
  }

  update(user: User,_id: String){
    return this._http.put("/users/"+_id, user)
    .map(data => data.json()).toPromise()
  }

  getUsers(){
    return this._http.get("/users")
    .map(data => data.json()).toPromise()
  }

  getUser(user: User,_id: String){
    return this._http.get("/users/"+_id)
    .map(data => data.json()).toPromise()
  }
}