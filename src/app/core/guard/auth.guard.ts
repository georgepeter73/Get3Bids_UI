import { Injectable } from "@angular/core";
import { AuthService } from "../service/auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!(await this.authService.checkAuthenticated()) || this.authService.isTokenExpired()) {
      await this.router.navigate(["/auth/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
