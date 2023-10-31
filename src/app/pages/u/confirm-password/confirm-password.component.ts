import { Component } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsService } from "../../../services/notifications.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message } from "../../../data/notifications";

@Component({
    selector: 'app-confirm-password',
    templateUrl: './confirm-password.component.html',
    styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent {
    f: FormGroup = new FormGroup<any>({});
    isCodeEmpty = false;
    errorMessage?: Message;

    private token?: string;

    constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private notificationsService: NotificationsService, private fb: FormBuilder) {
        this.f = this.fb.group({
            password: ['', [Validators.required]],
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
                "Ti pos ussa s'annunziar cun il nov pled-clav."
            );
            this.router.navigateByUrl("/u/login");
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
}
