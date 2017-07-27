import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  public title = 'Hello Conference';

  constructor(
      private auth: AuthService,
      private router: Router
  ) { }

  ngOnInit() {

  }

  gotoLink(link){
    this.router.navigate([link]);
  }

}
