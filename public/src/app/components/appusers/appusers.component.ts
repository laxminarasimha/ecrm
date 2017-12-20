import { Component, OnInit, Input } from '@angular/core';


import {AppuserService } from '../../_services/appuser/appuser.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-appusers',
  templateUrl: './appusers.component.html',
  styleUrls: ['./appusers.component.css']
})
export class AppusersComponent implements OnInit {
  
  
  @Input() user:User;
  userCreatedMsg:Boolean=false;
  constructor(private _appUserService: AppuserService) { }

  ngOnInit() {
    this.user = new User();
    this.user.first_name="abc";
    this.user.last_name="def";
    this.user.email="abc@gmail.com";
    this.user.password="abcdef";
  }

  
  createUser(){
    this._appUserService.create(this.user).subscribe
    (
      data => this.userCreatedMsg = data.success,
      err => console.log(err),
      () => console.log('Request Completed')
   ); 
  }

}
