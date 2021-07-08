import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        @Inject(Router) private router: Router
    ) { }

    /**
     * Can this route be activated?
     * @param {ActivatedRouteSnapshot} route - The route.
     * @returns {Promise<boolean>} True if user is authenticated otherwise false
     */
    public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        const allowedUserRoles = this.getRoutePermissions(route);
        return await this.checkPermission(allowedUserRoles);
    }

    /**
     * Can this child route be activated?
     * @param {ActivatedRouteSnapshot} route - The route.
     * @returns {Promise<boolean>} True if user is authenticated otherwise false
     */
    public async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
        const allowedUserRoles = this.getRoutePermissions(route);
        return await this.checkPermission(allowedUserRoles);
    }

    /**
     * Can this route be loaded.
     */
    public canLoad(){
        return this.checkPermission(null);
    }

    /**
     * Get allowed user roles from the route.
     * @param {ActivatedRouteSnapshot} route - The route.
     * @returns {string[]} All user roles that are allowed to access the route.
     */
    private getRoutePermissions(route: ActivatedRouteSnapshot): Roles[] {
        if (route.data && route.data.userRoles) {
            return route.data.userRoles as Roles[];
        }
        return null;
    }

    /**
     * Check if a user is authenticated
     * @param {string[]} allowedUserRoles - These user roles have the permissions to access the route.
     */
    private checkPermission(allowedUserRoles: Roles[]) {
        const token = localStorage.getItem('idToken');
        if (token) {
            return true;
        } else {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}

export enum Roles {
    ADMIN = 'ADMIN'
}