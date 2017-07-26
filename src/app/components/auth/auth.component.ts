import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "./user";
import {Response} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  constructor(
      private auth: AuthService,
      private router: Router
  ) {}

  ngOnInit(){

  }

   signIn(username, password){
     console.log(username+'@'+password);
     this.auth.authToken(username, password);
     this.router.navigate(['/conference']);
   }

}
