import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private socket = io('http://10.109.36.195:4242');

  constructor() { }

  confBridgeStart(){
    this.socket.on('ConfBridgeStart-event', function (data) {
        console.log(data);
        return data;
    }.bind(this));
  }

  confBridgeJoin(){
    this.socket.on('ConfBridgeJoin-event', function (data) {
      return data;
    }.bind(this));
  }

  confBridgeLeave(){
    this.socket.on('ConfBridgeLeave-event', function (data) {
      return data;
    })
  }

  confBridgeEnd(){
    this.socket.on('ConfBridgeEnd', function (data) {
      return data;
    })
  }
}
