import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {SystemRole} from "../data/security";

export function authGuard(neededRoles: SystemRole[] = []): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthenticationService);
    const router: Router = inject(Router);
    if (!authService.isLoggedIn()) {
      router.navigate(['/u/login'], {queryParams: {redirectTo: state.url}});
      return false;
    }

    if (neededRoles.length === 0) {
      return true;
    }

    const userRoles = authService.getRoles();
    let hasRoles = true;
    neededRoles.forEach((neededRole: SystemRole) => {
      if (userRoles.indexOf(neededRole) === -1) {
        hasRoles = false;
      }
    });

    if (!hasRoles) {
      router.navigate(['/u/login'], {queryParams: {redirectTo: state.url}});
      return false;
    }

    return true;
  }
}
