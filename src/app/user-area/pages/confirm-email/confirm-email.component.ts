import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
    private code?: string;

    isCurrentlyValidating = true;
    showCodeEmptyError = false;
    showInvalidCodeError = false;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationsService: NotificationsService,
    ) {
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                    this.code = params['code'];
                    this.validateCode();
                }
            );
    }

    private validateCode(): void {
        if (!this.code || this.code.length === 0) {
            this.isCurrentlyValidating = false;
            this.showCodeEmptyError = true;
            return;
        }

        this.authService.confirmEmail(this.code).subscribe(() => {
            this.isCurrentlyValidating = false;
            this.notificationsService.successMessage(
                "Confermà cun success tia adressa dad email",
                "Ti pos ussa s'annunziar."
            );
            this.router.navigateByUrl("/user/login");
        }, () => {
            this.isCurrentlyValidating = false;
            this.showInvalidCodeError = true;
        });
    }
}
