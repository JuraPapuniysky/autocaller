import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public projectName: string;
  public userName: string;
  public user:string;
  constructor(
      private auth: AuthService
  ) {
    this.projectName = 'Auto Caller';
    //this.userName = this.auth.user.username;
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    console.log(this.user);
  }

}
