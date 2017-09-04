import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import {DataService} from "../../services/data.service";
import {ActiveList} from "./active.list";
import {forEach} from "@angular/router/src/utils/collection";


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


    constructor(private auth: AuthService,
                private data: DataService,
                private router: Router,) {
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
                if (res != false) {
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
            console.log(data);
            let events = data.response.events;

            this.updateActiveList(events);
        }.bind(this));
    }

    public originate(catalog){
        console.log(catalog);
        this.socket.emit('originate', {
            channel: "SIP/"+catalog.number,
            callerid: catalog.number,
            conference: this.activeConference.number
        });
        this.socket.on('originate-res', function (data) {
           console.log(data);
        });
    }

    public updateActiveList(events) {
        this.data.getActiveList()
            .subscribe((res) => {
                for (let event of events) {
                    // console.log(event);
                    if (event.conference == this.activeConference.number) {
                        let i = 0;
                        for (let item of this.activeList) {
                            if (item.number == event.calleridnum) {
                                this.activeList[i].isActive = true;
                                this.activeList[i].channel = event.channel;
                                if(this.activeList[i].microphone == 1){
                                    this.confbridgeUnmute(this.activeConference.number, this.activeList[i].channel);
                                }else {
                                    this.confbridgeMute(this.activeConference.number, this.activeList[i].channel);
                                }
                            }
                            i++;
                        }
                    }
                }
            });
    }

    private createActiveList(res) {
        for (let item of res) {
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
            let e = data.event;
        }.bind(this));

    }

    confBridgeJoin() {
        this.socket.on('ConfbridgeJoin-event', function (data) {

            this.confJoinEvents = data.event;
            console.log(this.confJoinEvents);
            console.log(this.activeList);
            let i = 0;
            for (let item of this.activeList) {
                if (this.activeConference.number == this.confJoinEvents.conference) {
                    if (item.number == this.confJoinEvents.calleridnum) {
                        this.activeList[i].channel = this.confJoinEvents.channel;
                        if(this.activeList[i].microphone == 1){
                            this.confbridgeUnmute(this.activeConference.number, this.activeList[i].channel);
                        }else {
                            this.confbridgeMute(this.activeConference.number, this.activeList[i].channel);
                        }
                    }
                }
                i++;
            }
        }.bind(this));
    }

    confBridgeLeave() {
        this.socket.on('ConfbridgeLeave-event', function (data) {
            this.confJoinEvents = data.event;
            console.log(this.confJoinEvents);
            let i = 0;
            for (let item of this.activeList) {
                if (this.activeConference.number == this.confJoinEvents.conference) {
                    if (item.number == this.confJoinEvents.calleridnum && item.channel == this.confJoinEvents.channel) {
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

    public microphoneOn(catalog) {
        this.data.microphone(catalog)
            .subscribe((res) => {
                if (res != false) {
                    this.confbridgeUnmute(this.activeConference.number, catalog.channel);
                    this.setMicrophone(res);
                }
            });
    }

    public microphoneOff(catalog) {
        console.log(catalog);
        this.data.microphone(catalog)
            .subscribe((res) => {
                if (res != false) {
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
        for (let catalog of this.activeList) {
            if (catalog.configNumberId == res.id) {
                this.activeList[i].microphone = res.microphone;
            }
            i++;
        }
    }

    public confbridgeKick(catalog){
        this.socket.emit('confbrige-kick', {
           conference: this.activeConference.number,
           channel: catalog.channel
        });
    }

    public setSingleVideo(catalog){
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

    public callAll(){
        for (let catalog of this.activeList){
            this.originate(catalog);
        }
    }

    public kickAll(){
        for (let catalog of this.activeList){
            this.confbridgeKick(catalog);
        }
    }

    public muteAll(){
        for (let catalog of this.activeList){
            if(catalog.microphone == 1 && this.isCatalogActive(catalog)){
                this.microphoneOff(catalog);
            }
        }
    }

    public unmuteAll(){
        for (let catalog of this.activeList){
            if(catalog.microphone != 1 && this.isCatalogActive(catalog)){
                this.microphoneOn(catalog);
            }
        }
    }

    public setImage(){
        for (let catalog of this.activeList){
            if (catalog.number == '894490' && this.isCatalogActive(catalog)){
                this.setSingleVideo(catalog);
            }
        }
    }

    public isCatalogActive(catalog) {
        return catalog.channel != '';
    }


}
