import { inject } from "@angular/core";
import {Location} from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { Roles } from "../enums/authentication/roles";

export const requiredRoleGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthenticationService);

    const roles = route.data['roles'] as Roles[];

    if (roles.includes(authService.userRole)) {
        return true;
    }

    return false;
}