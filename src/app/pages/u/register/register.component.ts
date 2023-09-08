import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsService} from "../../../services/notifications.service";

class NotificationService {
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    f: FormGroup = new FormGroup<any>({});

    didSubmit = false;

    constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private notificationsService: NotificationsService) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    register() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.didSubmit = true;
        this.notificationsService.clearMessages();
        this.authService.register(this.f.value.email, this.f.value.password, this.f.value.displayName, this.f.value.organisation).subscribe(token => {
            this.notificationsService.successMessage(
                'Registrà cun success',
                "Ti t'es registrà cun success. Ti retschaivas bainprest in e-mail. Confermar p.pl. tia adressa dad e-mail per cuntinuar."
            );
            this.router.navigateByUrl("/u/login");
        }, error => {
            console.error(error);
            this.didSubmit = false;

            if (error.error.message === 'Email Address already in use!') {
                this.notificationsService.errorMessage(
                    'Gia registrà',
                    "I exista gia in conto cun questa adressa dad e-mail."
                );
            } else {
                this.notificationsService.errorMessage(
                    'Errur nunenconuschenta',
                    "Igl è capità ina errur nunenconuschenta durant sa regisrar. Empruvar p.pl. pli tard anc ina giada"
                );
            }
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    private initForm() {
        this.f = this.fb.group({
            displayName: ['', Validators.required],
            organisation: [''],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
}