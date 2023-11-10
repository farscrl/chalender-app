// based on https://stackoverflow.com/a/74339731

import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { NavigationEnd, Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private history: string[] = []

    constructor(
        private router: Router,
        private location: Location
    ) {
        // Listen to router events of type NavigationEnd to
        // manage an app-specific navigation history.
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects);
            }
        })
    }

    back(): void {
        this.history.pop();

        if (this.history.length > 0) {
            console.log('navigating back')
            this.location.back();
        } else {
            console.log('navigating to /')
            this.router.navigateByUrl('/');
        }
    }
}
