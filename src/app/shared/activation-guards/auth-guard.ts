import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        const authService = inject(AuthenticationService);
        const router = inject(Router);

        const isAuthenticated = authService.isAuthenticated;

        if (isAuthenticated) {
            return isAuthenticated;
        }

        return router.parseUrl('/users/login')
};

export const authGuardChild: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => authGuard(route, state);