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

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth(){
    this.auth.authByToken()
        .subscribe((res) => {
          if(res != false){
            this.auth.setUserLoggedIn();
            this.auth.user = res;
            this.router.navigate(['/']);
          }else {
            this.router.navigate(['/auth']);
          }
        });
  }

}



