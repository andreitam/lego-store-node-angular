import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.tokenStorageService.getUser();
    if (user) {
        // check if route is restricted by customer rights
        if (route.data.rights && !route.data.rights.includes(user.rights)) {
            // rights not authorized so redirect to main page
            this.router.navigate(['/main']);
            return false;
        }

        // authorized so return true
        return true;
    }

    // not logged in so redirect to login page with the return url 
    this.router.navigate(['/main'], { queryParams: { returnUrl: state.url }});
    return false;
}
}
