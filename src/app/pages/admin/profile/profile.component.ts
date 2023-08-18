import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Profile} from "../../../data/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    f: FormGroup = new FormGroup<any>({});
    didSubmit = false;
    profile?: Profile;
    showSuccess = false;
    showError = false;

    constructor(private authService: AuthenticationService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.authService.loadProfile().subscribe(profile => {
            this.profile = profile;
            this.initForm();
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    update() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.didSubmit = true;
        this.showError = false;
        this.showSuccess = false;
        this.authService.saveProfile(this.f.value.displayName, this.f.value.organisation).subscribe({
            next: profile => {
                this.profile = profile;
                this.didSubmit = false;
                this.showSuccess = true;
            },
            error: error => {
                this.didSubmit = false;
                console.error(error);
                this.showError = true;
            }
        });
    }

    private initForm() {
        this.f = this.fb.group({
            email: [this.profile?.email, [Validators.required, Validators.email]],
            displayName: [this.profile?.displayName, [Validators.required]],
            organisation: [this.profile?.organisation],
        });
        this.f.controls['email'].disable();
    }
}
