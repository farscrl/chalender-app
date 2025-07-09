import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
    selector: 'app-notices',
    templateUrl: './notices.component.html',
    styleUrls: ['./notices.component.scss']
})
export class NoticesComponent {

    constructor(private router: Router, private authService: AuthenticationService) {
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.createNotice(true);
        }
    }

    login(): void {
        this.router.navigate(['/user/login'], {queryParams: {redirectTo: '/user/notice-form'}});
    }

    createNotice(replaceUrl: boolean = false): void {
        this.router.navigate(['/user/notice-form'], {replaceUrl: replaceUrl});
    }
}
