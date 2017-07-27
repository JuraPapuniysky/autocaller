import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ConferenceComponent} from "./components/conference/conference.component";
import {AuthComponent} from "./components/auth/auth.component";
import {UserComponent} from "./components/user/user.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'conference', pathMatch: 'full'},
    {path: 'conference', canActivate: [AuthGuard], component: ConferenceComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'user', canActivate: [AuthGuard], component: UserComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
