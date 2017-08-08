import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  private socket = io('http://localhost:4242');

  public confStartEvent;
  public event: string;
  public confJoinEvents = [];
  public activeList;

  constructor(
      private auth: AuthService,
      private data: DataService,
      private router: Router
  ) {}

  ngOnInit() {
    this.confBridgeStart();
    this.confBridgeJoin();
    this.getActiveList();
  }


  private getActiveList(){
    this.data.getActiveList()
        .subscribe((res) => {
          if (res != false){
            console.log(res);
            this.activeList = res;
          }
        });
  }

  confBridgeStart(){
    this.socket.on('ConfbridgeStart-event', function (data) {
      let e = data.event;
    }.bind(this));

  }

  confBridgeJoin(){
    this.socket.on('ConfbridgeJoin-event', function (data) {
      let e = data.event;
      this.confJoinEvents.push(e);
      console.log(this.confJoinEvents);
    }.bind(this));
  }

  sendMessage(message){
    this.socket.emit('save-message', message);
  }

}
