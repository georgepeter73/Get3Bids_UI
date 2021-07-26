import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../service/auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!(await this.authService.checkAuthenticated())) {
      await this.router.navigate(["/auth/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
