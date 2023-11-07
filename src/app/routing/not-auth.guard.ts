import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthenticationService } from '../shared/services/authentication.service';

export function notAuthGuard(): CanActivateFn {
    return () => {
        const authService = inject(AuthenticationService);
        const router: Router = inject(Router);
        if (authService.isLoggedIn()) {
            router.navigate(['/']);
            return false;
        }

        return true;
    }
}
