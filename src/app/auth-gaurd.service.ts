import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private authservice : AuthService,private router :Router){}
    
    canActivate(route : ActivatedRouteSnapshot,
                state : RouterStateSnapshot) 
                : Observable<boolean> | Promise<boolean> | boolean
                 {
                    return this.authservice.isAuthenticated()
                    .then((authenticated : boolean)=>{
                        if(authenticated){
                            return true;
                        }
                        else{
                            this.router.navigate(['/']);
                        }
                    }
                )
            }

    canActivateChild(route : ActivatedRouteSnapshot,
        state : RouterStateSnapshot) 
        : Observable<boolean> | Promise<boolean> | boolean{
            return this.canActivate(route,state);
        }        
}