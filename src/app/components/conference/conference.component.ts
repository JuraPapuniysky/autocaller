import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  public title = 'Hello Conference';
  socket = io('http://localhost:4242');

  constructor(
      private auth: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.socket.on('new-message', function (data) {
      console.log(data);
    })
  }

  gotoLink(link){
    this.router.navigate([link]);
  }

  sendMessage(message){
    this.socket.emit('save-message', message);
  }

}
