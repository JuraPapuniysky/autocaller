import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ConferenceComponent} from "./components/conference/conference.component";
import {AuthComponent} from "./components/auth/auth.component";
import {UserComponent} from "./components/user/user.component";
import {AuthGuard} from "./guard/auth.guard";
import {CatalogComponent} from "./components/catalog/catalog.component";
import {ListsComponent} from "./components/lists/lists.component";
import {UpdateNumberComponent} from "./components/catalog/update-number/update-number.component";

const routes: Routes = [
    {path: '', redirectTo: 'conference', pathMatch: 'full'},
    {path: 'conference', canActivate: [AuthGuard], component: ConferenceComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'user', canActivate: [AuthGuard], component: UserComponent},
    {path: 'catalog', canActivate: [AuthGuard], component: CatalogComponent},
    {path: 'lists', canActivate: [AuthGuard], component: ListsComponent},
    {path: 'update-catalog', canActivate: [AuthGuard], component: UpdateNumberComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
