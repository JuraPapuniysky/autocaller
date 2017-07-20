import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";

import {AppRoutingModule} from "./app.routing.module";

import {DataService} from "./services/data.service";
import {SocketService} from "./services/socket.service";
import {AuthService} from "./services/auth.service";

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ConferenceComponent} from './components/conference/conference.component';
import { AuthComponent } from './components/auth/auth.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ConferenceComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        DataService,
        SocketService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
