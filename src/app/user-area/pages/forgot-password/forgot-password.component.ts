import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    imports: [FormsModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
    f: FormGroup;

    didSendRequest = false;

    isSendingRequest = false;

    constructor(private fb: FormBuilder, private authService: AuthenticationService) {
        this.f = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    resetPassword() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.isSendingRequest = true;
        this.authService.resetPassword(this.f.value.email).subscribe(() => {
            this.didSendRequest = true;
        }, error => {
            this.isSendingRequest = false;
            console.error(error);
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }
}
