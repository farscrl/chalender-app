import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    constructor(private router: Router, private authService: AuthenticationService) {
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.createEvent();
        }
    }

    login(): void {
        this.router.navigate(['/u/login'], {queryParams: {redirectTo: '/admin/events/new'}});
    }

    createEvent(): void {
        this.router.navigate(['/admin/events/new']);
    }
}