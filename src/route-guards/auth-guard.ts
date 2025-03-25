import { inject } from "@angular/core";
import { ActivatedRoute,Router,RouterStateSnapshot } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "src/services/auth-.service";

export const canActivate = (
    router : ActivatedRoute,
    state : RouterStateSnapshot
) =>{
    const authService = inject(AuthService);
    const route = inject(Router);

    return authService.loggedUserSubject.pipe(take(1),map((user)=>{
        const loggedIn = user ? true : false;

        if(loggedIn){
            return true;
        }
        else{
            return route.createUrlTree(['/']);
        }
    }))
}