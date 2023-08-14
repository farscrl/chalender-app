import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email = '';
    password = '';


    constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    }

    login() {
        this.authService.login(this.email, this.password).subscribe(token => {
            this.authService.authSuccess(token.accessToken);
            this.redirect();
        })
    }

    private async redirect() {
        const queryParams = this.route.snapshot.queryParams;
        let redirectTo = '/';
        if (queryParams['redirectTo']) {
            // to avoid param hacking: removing first character and adding a '/'
            redirectTo = '/' + queryParams['redirectTo']!.slice(1);
        }
        await this.router.navigateByUrl(decodeURI(redirectTo));
    }
}
