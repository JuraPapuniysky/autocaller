import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "./user";
import {Response} from "@angular/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  private username = 'admin';
  private password = 'P@ssw0rd';

  public authToken;


  public users;
  public usersCount;

  constructor(private authService: AuthService) {}

  ngOnInit(){
  //  this.authService.getUsers().subscribe(
  //      (data) => {
  //        this.users = data;
  //        this.usersCount = this.users.length;
  //
  //      }
  //  );

    this.authService.authToken(this.username, this.password);

   }

}
