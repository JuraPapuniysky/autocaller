import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public projectName: string;
  public userName: string;
  public user: any;


  constructor(
      private auth: AuthService,
      private router: Router
  ) {
    this.projectName = 'Auto Caller';
  }

  ngOnInit() {
    this.user = this.getUser();
  }

  getUser(){
    this.auth.authByToken()
        .subscribe((res) => {
            if(res != false){
              this.user = res;
            }
        });
  }

  gotoCatalog(){
    this.router.navigate(['/catalog']);
  }

  gotoLists(){
    this.router.navigate(['/lists']);
  }

  logIn(){
    this.router.navigate(['/auth']);
  }

  logOut(){
    this.user = null;
    this.auth.logOut();
    this.router.navigate(['/auth']);
  }

}
