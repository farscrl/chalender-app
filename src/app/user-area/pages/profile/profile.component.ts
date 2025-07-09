import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserFormService } from '../../services/user-form.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from '../../../shared/components/forms/user/user.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [NgbAlert, UserComponent, RouterLink]
})
export class ProfileComponent implements OnInit {
    didSubmit = false;
    showSuccess = false;
    showError = false;

    constructor(
        public ufs: UserFormService,
        private authService: AuthenticationService,
        private router: Router,
    ) {
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

    deleteAccount() {
        this.router.navigate(['/user/delete']);
    }
}
