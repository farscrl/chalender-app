import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Message } from '../../../shared/data/notifications';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {

    f: FormGroup;
    didSubmit = false;

    errorMessage?: Message;

    constructor(
        fb: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
        private notificationsService: NotificationsService,
        private translateService: TranslateService
    ) {
        this.f = fb.group({
            deleteType: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    delete() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.errorMessage = undefined;
        this.didSubmit = true;
        this.authService.deleteProfile(this.f.get('password')?.value, this.f.get('deleteType')?.value).subscribe(() => {
                this.notificationsService.successMessage(
                    this.translateService.instant('FORMS.DELETE_USER.SUCCESS_TITLE'),
                    this.translateService.instant('FORMS.DELETE_USER.SUCCESS_DESCRIPTION')
                );
                this.authService.logout();
                this.router.navigateByUrl('/');
            },
            (error) => {
                this.didSubmit = false;
                if (error.error && error.error.error && error.error.error === 'Unauthorized') {
                    this.errorMessage = {
                        type: 'danger',
                        title: this.translateService.instant('FORMS.DELETE_USER.ERROR_PW_TITLE'),
                        message: this.translateService.instant('FORMS.DELETE_USER.ERROR_PW_DESCRIPTION'),
                    };
                } else {
                    this.errorMessage = {
                        type: 'danger',
                        title: this.translateService.instant('FORMS.DELETE_USER.ERROR_TITLE'),
                        message: this.translateService.instant('FORMS.DELETE_USER.ERROR_DESCRIPTION'),
                    };
                }
                console.error(error);
            });
    }
}
