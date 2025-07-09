import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Message } from '../../../shared/data/notifications';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-confirm-password',
    templateUrl: './confirm-password.component.html',
    styleUrls: ['./confirm-password.component.scss'],
    standalone: false
})
export class ConfirmPasswordComponent {
    f: FormGroup = new FormGroup<any>({});
    isCodeEmpty = false;
    errorMessage?: Message;

    private token?: string;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationsService: NotificationsService,
        private fb: FormBuilder,
    ) {
        this.f = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                    this.token = params['token'];
                    if (!this.token || this.token.length === 0) {
                        this.isCodeEmpty = true;
                    }
                }
            );
    }

    changePassword() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.notificationsService.clearMessages();

        this.authService.resetRedefinePassword(this.token!, this.f.value.password).subscribe(() => {
            this.notificationsService.successMessage(
                "Midà cun success test pled-clav",
                "Ti pos ussa s’annunziar cun il nov pled-clav."
            );
            this.router.navigateByUrl("/user/login");
        }, error => {
            this.errorMessage = {
                type: 'danger',
                title: 'Errur',
                message: "Betg pussaivel da midar il pled-clav. Emprova pli tard anc ina giada."
            };
            console.error(error);
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    isFieldError(fieldName: string, errorName: string) {
        const field = this.f.get(fieldName)!;
        return field.hasError(errorName);
    }
}
