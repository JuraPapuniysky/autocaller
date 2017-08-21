import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import {DataService} from "../../services/data.service";
import {ActiveList} from "./active.list";


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
  public activeList = [];
  public activeConference;



  constructor(
      private auth: AuthService,
      private data: DataService,
      private router: Router,

  ) {
      this.activeConference = {id: '', name: '', user_id: '', number: '', updated_at: '', created_at: ''};
      this.getActiveConference();

  }

  ngOnInit() {

      this.getActiveList();
      this.confbridgeReq();
      this.confBridgeRes();
      this.confBridgeStart();
      this.confBridgeJoin();
      this.confBridgeLeave();


      //this.data.call();

  }


  private getActiveList(){
    this.data.getActiveList()
        .subscribe((res) => {
          if (res != false){
            //console.log(res);
            this.createActiveList(res);
             // console.log(this.activeList);
          }
        });
  }

    private confbridgeReq() {
        this.data.getActiveConference().subscribe((res) => {
            if(res != null){
                this.activeConference = res;
                this.socket.emit('confbridge-list-req', {
                    conference: this.activeConference.number
                });
            }
        });


    }
  
  private confBridgeRes(){
      this.socket.on('confbridge-list-res', function (data) {
          console.log(data);
          let events = data.response.events;

          this.updateActiveList(events);
      }.bind(this));
  }

  public updateActiveList(events){
      this.data.getActiveList()
          .subscribe((res) => {
              console.log(this.activeList);
              console.log(this.activeConference);
              console.log(events);
              for (let event of events){
                  // console.log(event);
                  if(event.conference == this.activeConference.number){
                      let i = 0;
                      for (let item of this.activeList){
                          if (item.number == event.calleridnum){
                              this.activeList[i].isActive = true;
                              this.activeList[i].channel = event.channel;
                          }
                          i++;
                      }
                  }
              }
          });

  }

  private createActiveList(res){
      for (let item of res){
          let activeList = new ActiveList();
          activeList.catalogId = item.catalog_id;
          activeList.configNumberId = item.config_number_id;
          activeList.name = item.name;
          activeList.number = item.number;
          activeList.microphone = item.microphone;
          activeList.isActive = false;
          activeList.channel = '';
          this.activeList.push(activeList);
      }
  }

  confBridgeStart(){
    this.socket.on('ConfbridgeStart-event', function (data) {
      let e = data.event;
    }.bind(this));

  }

  confBridgeJoin(){
    this.socket.on('ConfbridgeJoin-event', function (data) {

      this.confJoinEvents = data.event;
      console.log(this.confJoinEvents);
        console.log(this.activeList);
        let i = 0;
        for (let item of this.activeList){
            if (this.activeConference.number == this.confJoinEvents.conference){
                if (item.number == this.confJoinEvents.calleridnum){
                    this.activeList[i].channel = this.confJoinEvents.channel;
                }
            }
            i++;
        }
    }.bind(this));
  }

  confBridgeLeave(){
      this.socket.on('ConfbridgeLeave-event', function (data) {
          this.confJoinEvents = data.event;
          console.log(this.confJoinEvents);
          let i = 0;
          for (let item of this.activeList){
              if(this.activeConference.number == this.confJoinEvents.conference){
                  if (item.number == this.confJoinEvents.calleridnum && item.channel == this.confJoinEvents.channel){
                      this.activeList[i].channel = '';
                  }
              }
              i++;
          }
      }.bind(this));
  }

  public isMicrophoneActive(catalog) {
    if (catalog.microphone != '0') {
      return true;
    } else {
      return false;
    }
  }

  public microphoneOn(catalog){
    this.data.microphone(catalog)
        .subscribe((res) => {
            if(res != false){
              this.confbridgeUnmune(this.activeConference.number, catalog.channel);
              this.setMicrophone(res);
            }
        });
  }

  public microphoneOff(catalog){
      console.log(catalog);
    this.data.microphone(catalog)
        .subscribe((res) => {
          if(res != false){
            this.confbridgeMute(this.activeConference.number, catalog.channel);
            this.setMicrophone(res);
          }
        });
  }

  private confbridgeMute(conference, channel){
      this.socket.emit('confbridge-mute', {
          conference: conference,
          channel: channel
      });
      this.socket.on('confbridge-mute-res', function (data) {
          console.log(data);
      }.bind(this));
  }

  private confbridgeUnmune(conference, channel){
      this.socket.emit('confbridge-unmute', {
          conference: conference,
          channel: channel
      });
      this.socket.on('confbridge-unmute-res', function (data) {
          console.log(data);
      }.bind(this));
  }

  protected setMicrophone(res){
    let i = 0;
    for (let catalog of this.activeList){
      if (catalog.configNumberId == res.id){
        this.activeList[i].microphone = res.microphone;
      }
      i++;
    }
  }

  private getActiveConference(){
      this.data.getActiveConference().subscribe((res) => {
         console.log(res);
         if(res != null){
             this.activeConference = res;
         }
      });
  }

  public isCatalogActive(catalog){
     return catalog.channel == '';
  }

  sendMessage(message){
    this.socket.emit('save-message', message);
  }

}
