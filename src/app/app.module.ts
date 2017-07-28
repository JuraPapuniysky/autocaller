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
import { UserComponent } from './components/user/user.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import {AuthGuard} from "./guard/auth.guard";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { ListsComponent } from './components/lists/lists.component';
import { UpdateNumberComponent } from './components/catalog/update-number/update-number.component';




@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ConferenceComponent,
        AuthComponent,
        UserComponent,
        CatalogComponent,
        ListsComponent,
        UpdateNumberComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        CommonModule
    ],
    providers: [
        DataService,
        SocketService,
        AuthService,
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
