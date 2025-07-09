import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { confirmPasswordsValidator } from '../../../shared/validators/confirm-passwords.validator';
import { Router } from '@angular/router';
import { Message } from '../../../shared/data/notifications';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    standalone: false
})
export class ChangePasswordComponent {
    f: FormGroup = new FormGroup<any>({});
    didSubmit = false;
    showMessage = false;
    message = new Message(
        'danger',
        '',
        ''
    );

    constructor(private authService: AuthenticationService, private fb: FormBuilder, private router: Router) {
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
        this.showMessage = false;
        this.authService.changePassword(this.f.value.current, this.f.value.newPassword).subscribe({
            next: () => {
                this.message.type = 'success';
                this.message.title = 'Actualisà il pled-clav';
                this.message.message = 'Il pled-clav è vegnì actualisà cun success.';

                this.didSubmit = false;
                this.showMessage = true;
            },
            error: error => {
                this.message.type = 'danger';
                if (error.status === 401) {
                    this.message.title = 'Errur cun actualisar';
                    this.message.message = 'Tes pled-clav actual n’è betg correct.';
                } else {
                    console.error(error);
                    this.message.title = 'Errur cun actualisar';
                    this.message.message = 'Ina errur è cumparida cun actualisar il pled-clav. Emprova pli tard anc ina giada.';
                }

                this.didSubmit = false;
                this.showMessage = true;
            }
        });
    }

    cancel() {
        this.router.navigate(['/user/profile']);
    }
}
