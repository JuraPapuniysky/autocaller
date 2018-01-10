import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import {DataService} from '../../services/data.service';
import {ActiveList} from './active.list';
import {Call} from './call';


@Component({
    selector: 'app-conference',
    templateUrl: './conference.component.html',
    styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

    private socket = io('http://10.109.71.239:4242');

    public confStartEvent;
    public event: string;
    public confJoinEvents = [];
    public activeList = [];
    public unListActiveUsers = [];
    public activeConference;

    public model = new Call('');

    constructor(private auth: AuthService,
                private data: DataService,
                private router: Router, ) {
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
    }


    private getActiveList() {
        this.data.getActiveList()
            .subscribe((res) => {
                if (res !== false) {
                    this.createActiveList(res);
                }
            });
    }

    private confbridgeReq() {
        this.data.getActiveConference().subscribe((res) => {
            if (res != null) {
                this.activeConference = res;
                this.socket.emit('confbridge-list-req', {
                    conference: this.activeConference.number
                });
            }
        });


    }

    private confBridgeRes() {
        this.socket.on('confbridge-list-res', function (data) {
            //console.log(data);
            const events = data.response.events;

            this.updateActiveList(events);
        }.bind(this));
    }

    public originate(catalog) {
        console.log(catalog);
        let channel = '';
        let conference = this.activeConference.number;
        if (catalog.number.length !== 3) {
            channel = 'SIP/' + catalog.number;
        }else {
            channel = 'SIP/SOE_193/' + catalog.number;
        }
        if (catalog.number == '000877') {
          channel = 'local/877';
          conference = '000877';
        }
        this.socket.emit('originate', {
            channel: channel,
            callerid: catalog.number,
            conference: conference
        });
        this.socket.on('originate-res', function (data) {
            console.log(data);
        });
    }

    public updateActiveList(events) {
        console.log(events);
        this.data.getActiveList()
            .subscribe((res) => {
                events.pop();
                let i = 0;
                for (const item of this.activeList) {
                    let n = 0;
                    for (const event of events) {
                        if (event.calleridnum == item.number) {
                            this.activeList[i].isActive = true;
                            this.activeList[i].channel = event.channel;
                            events.splice(n, 1);
                            if (this.activeList[i].microphone == 1) {
                                this.confbridgeUnmute(this.activeConference.number, this.activeList[i].channel);
                            } else {
                                this.confbridgeMute(this.activeConference.number, this.activeList[i].channel);
                            }
                        }
                        n++;
                    }
                    i++;
                }
                let m = 0;
                for (const event of events){
                    this.unListActiveUsers.push(event);
                    events.splice(m, 0);
                    m++;
                }
                for (const user of this.unListActiveUsers) {
                    this.confbridgeMute(this.activeConference.number, user.channel);
                }
            });
    }

    private createActiveList(res) {
        for (const item of res) {
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

    confBridgeStart() {
        this.socket.on('ConfbridgeStart-event', function (data) {
            const e = data.event;
        }.bind(this));

    }

    confBridgeJoin() {
        this.socket.on('ConfbridgeJoin-event', function (data) {

            this.confJoinEvents = data.event;
            console.log(this.confJoinEvents);
            console.log(this.activeList);
            let isList = false;
            let i = 0;
            for (const item of this.activeList) {
                if (this.activeConference.number == this.confJoinEvents.conference) {
                    if (item.number == this.confJoinEvents.calleridnum) {
                        this.activeList[i].channel = this.confJoinEvents.channel;
                        if (this.activeList[i].microphone == 1) {
                            this.confbridgeUnmute(this.activeConference.number, this.activeList[i].channel);
                        } else {
                            this.confbridgeMute(this.activeConference.number, this.activeList[i].channel);
                        }
                        isList = true;
                    }
                }
                i++;
            }
            if (isList == false) {
                if (this.activeConference.number === this.confJoinEvents.conference) {
                    this.unListActiveUsers.push(this.confJoinEvents);
                    this.confbridgeMute(this.activeConference.number, this.confJoinEvents.channel);
                }
            }
        }.bind(this));
    }

    confBridgeLeave() {
        this.socket.on('ConfbridgeLeave-event', function (data) {
            this.confJoinEvents = data.event;
            console.log(this.confJoinEvents);
            let i = 0;
            for (const item of this.activeList) {
                if (this.activeConference.number === this.confJoinEvents.conference) {
                    if (item.number === this.confJoinEvents.calleridnum && item.channel === this.confJoinEvents.channel) {
                        this.activeList[i].channel = '';
                    }
                }
                i++;
            }
            i = 0;
            for (const user of this.unListActiveUsers) {
                if (this.activeConference.number === this.confJoinEvents.conference) {
                    if (user.calleridnum === this.confJoinEvents.calleridnum && user.channel === this.confJoinEvents.channel) {
                        this.unListActiveUsers.splice(i, 1);
                    }
                }
                i++;
            }
        }.bind(this));
    }

    public isMicrophoneActive(catalog) {
        if (catalog.microphone != 0) {
            return true;
        }
    }

    public microphoneOn(catalog) {
        this.data.microphone(catalog)
            .subscribe((res) => {
                if (res !== false) {
                    this.confbridgeUnmute(this.activeConference.number, catalog.channel);
                    this.setMicrophone(res);
                }
            });
    }

    public microphoneOff(catalog) {
        console.log(catalog);
        this.data.microphone(catalog)
            .subscribe((res) => {
                if (res !== false) {
                    this.confbridgeMute(this.activeConference.number, catalog.channel);
                    this.setMicrophone(res);
                }
            });
    }

    private confbridgeMute(conference, channel) {
        this.socket.emit('confbridge-mute', {
            conference: conference,
            channel: channel
        });
        this.socket.on('confbridge-mute-res', function (data) {
            console.log(data);
        }.bind(this));
    }

    private confbridgeUnmute(conference, channel) {
        this.socket.emit('confbridge-unmute', {
            conference: conference,
            channel: channel
        });
        this.socket.on('confbridge-unmute-res', function (data) {
            console.log(data);
        }.bind(this));
    }

    protected setMicrophone(res) {
        let i = 0;
        for (const catalog of this.activeList) {
            if (catalog.configNumberId == res.id) {
                this.activeList[i].microphone = res.microphone;
            }
            i++;
        }
    }

    public confbridgeKick(catalog) {
        this.socket.emit('confbrige-kick', {
            conference: this.activeConference.number,
            channel: catalog.channel
        });
    }

    public setSingleVideo(catalog) {
        this.data.setVideo(this.activeConference.number, catalog.channel)
            .subscribe((res) => {
                console.log(res);
            });
    }

    private getActiveConference() {
        this.data.getActiveConference().subscribe((res) => {
            console.log(res);
            if (res != null) {
                this.activeConference = res;
            }
        });
    }

    public callAll() {
        for (const catalog of this.activeList) {
            this.originate(catalog);
        }
    }

    public kickAll() {
        for (const catalog of this.activeList) {
            this.confbridgeKick(catalog);
        }
    }

    public muteAll() {
        for (const catalog of this.activeList) {
            if (catalog.microphone === 1 && this.isCatalogActive(catalog)) {
                this.microphoneOff(catalog);
            }
        }
    }

    public unmuteAll() {
        for (const catalog of this.activeList) {
            if (catalog.microphone !== 1 && this.isCatalogActive(catalog)) {
                this.microphoneOn(catalog);
            }
        }
    }

    public setImage() {
        for (const catalog of this.activeList) {
            if (catalog.number === '894490' && this.isCatalogActive(catalog)) {
                this.setSingleVideo(catalog);
            }
        }
    }

    public isCatalogActive(catalog) {
        return catalog.channel !== '';
    }


    public callNumber() {
        this.originate(this.model);
    }

}
