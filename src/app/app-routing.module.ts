import { NgModule } from '@angular/core';
import { Routes,RouterModule } from "@angular/router";

import { HomeComponent } from "app/home/home.component";
import { UsersComponent } from "app/users/users.component";
import { UserComponent } from "app/users/user/user.component";
import { ServersComponent } from "app/servers/servers.component";
import { ServerComponent } from "app/servers/server/server.component";
import { EditServerComponent } from "app/servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { AuthGaurd } from "app/auth-gaurd.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "app/error-page/error-page.component";
import { ServerResolver } from "app/servers/server/server-resolver.service";

const appRoutes : Routes=[
    { path : '' , component : HomeComponent},
    { path : 'users' , component : UsersComponent,children:[
      { path : ':id/:name' , component : UserComponent},   
    ]},
    { path : 'servers' ,canActivateChild:[AuthGaurd], component : ServersComponent,children :[
      { path : ':id' , component : ServerComponent , resolve:{server :ServerResolver}},
      { path : ':id/edit' , component : EditServerComponent , canDeactivate: [CanDeactivateGuard] }
    ]},
    { path: 'not-found' , component : ErrorPageComponent, data:{ message : 'Page not found'}},
    { path : '**' , component : PageNotFoundComponent},
  ];


@NgModule({
imports:[
    RouterModule.forRoot(appRoutes)
],
exports: [RouterModule]
})
export class AppRoutingModule{

}