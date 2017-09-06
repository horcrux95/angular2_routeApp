import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { Observable } from "rxjs/Observable";
import { canComponentDeactivate } from "app/servers/edit-server/can-deactivate-guard.service";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,canComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit=false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
  
    this.route.queryParams
        .subscribe( (queryParams : Params)=>{
      
            this.allowEdit = (queryParams['allowEdit']==='1') ? true : false;
        });

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved=true;
    this.router.navigate(['../'],{relativeTo: this.route});    
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if(!this.allowEdit){
      return true;
    }else{
      if((this.serverName!=this.server.name || this.serverStatus!=this.server.status)&& !this.changesSaved){
        return confirm("are you sure you want to leave");
      }else{
        return true;
      }
    }
  }
}
