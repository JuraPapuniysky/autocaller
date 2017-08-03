import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private url = "http://localhost:4242";

  private socket;

  constructor() { }

}
