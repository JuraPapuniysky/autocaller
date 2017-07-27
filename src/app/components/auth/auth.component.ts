import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "./user";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {Auth} from "./auth";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  public model = new Auth('', '');

  public submited = false;

  constructor(
      private auth: AuthService,
      private router: Router
  ) {}

  ngOnInit(){
      console.log(localStorage.getItem('access-token'));
  }

   signIn(){
     this.auth.authToken(this.model.username, this.model.password)
         .subscribe(
             (res) => {
                 if(!res == false){
                     console.log(res);
                     console.log(res.access_token);
                     localStorage.setItem('access-token', res.access_token);
                     if(localStorage.getItem('access-token')){
                         this.auth.setUserLoggedIn();
                         this.router.navigate(['/']);
                     }
                 }
             }
         );
   }



}
