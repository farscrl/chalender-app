import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { confirmPasswordsValidator } from '../../../shared/validators/confirm-passwords.validator';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    f: FormGroup = new FormGroup<any>({});
    didSubmit = false;
    showSuccess = false;
    showError = false;

    constructor(private authService: AuthenticationService, private fb: FormBuilder) {
        this.f = this.fb.group({
            current: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            newPasswordRepeat: ['', [Validators.required, confirmPasswordsValidator('newPassword', 'newPasswordRepeat')]],
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    isFieldError(fieldName: string, errorName: string) {
        const field = this.f.get(fieldName)!;
        return field.hasError(errorName);
    }

    update() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.didSubmit = true;
        this.showError = false;
        this.showSuccess = false;
        this.authService.changePassword(this.f.value.current, this.f.value.newPassword).subscribe({
            next: () => {
                this.didSubmit = false;
                this.showSuccess = true;
            },
            error: error => {
                console.error(error);
                this.didSubmit = false;
                this.showError = true;
            }
        });
    }
}
