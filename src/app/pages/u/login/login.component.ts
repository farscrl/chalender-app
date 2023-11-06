import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "../../../data/notifications";
import { NotificationsService } from "../../../services/notifications.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    f: FormGroup = new FormGroup<any>({});

    errorMessage?: Message;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private notificationsService: NotificationsService,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        // this.notificationsService.clearMessages();
    }

    login() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.notificationsService.clearMessages();
        this.authService.login(this.f.value.email, this.f.value.password).subscribe(token => {
            this.authService.authSuccess(token.accessToken);
            this.redirect();
        }, error => {
            if (error.error.message === 'User is disabled') {
                this.errorMessage = {
                    type: 'danger',
                    title: 'Conto betg activà',
                    message: "Tes conto n'è betg activ. Controllescha sche ti has confermà tia adressa dad e-mail"
                };
            } else {
                this.errorMessage = {
                    type: 'danger',
                    title: 'Errur',
                    message: "Betg pussaivel da s'annunziar cun questas datas"
                };
            }
            console.error(error);
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    private initForm() {
        this.f = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    private async redirect() {
        const queryParams = this.route.snapshot.queryParams;
        let redirectTo = '/';
        if (queryParams['redirectTo']) {
            // to avoid param hacking: removing first character and adding a '/'
            redirectTo = '/' + queryParams['redirectTo']!.slice(1);
        } else {
            this.notificationsService.successMessage(
                'S\'annunzià',
                "Ti es t'annunzià cun success."
            )
        }
        await this.router.navigateByUrl(decodeURI(redirectTo));
    }
}
