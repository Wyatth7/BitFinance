import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router"
import { AuthenticationService } from "../services/authentication/authentication.service"

export const accessLoginPageGuard: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    if (authService.isAuthenticated) {
        return router.parseUrl('/overview/view')
    }

    return !authService.isAuthenticated;
}