import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(
      private auth: AuthService,
      private router: Router
  ){}

  ngOnInit(){
    let token = localStorage.getItem('user');
    if (token){
      console.log(token);
      this.router.navigate(['/auth']);
    }

  }
}
