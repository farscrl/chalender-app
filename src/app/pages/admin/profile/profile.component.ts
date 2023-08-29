import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {UserFormService} from "../../../services/user-form.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    didSubmit = false;
    showSuccess = false;
    showError = false;

    constructor(public ufs: UserFormService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.loadProfile().subscribe(userDto => {
            this.ufs.setDto(userDto);
        });
    }


    update() {
        this.ufs.f.markAllAsTouched();

        if (!this.ufs.f.valid) {
            return;
        }

        this.didSubmit = true;
        this.showError = false;
        this.showSuccess = false;

        this.authService.saveProfile(this.ufs.getDto()).subscribe({
            next: userDto => {
                this.ufs.setDto(userDto);
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
}
