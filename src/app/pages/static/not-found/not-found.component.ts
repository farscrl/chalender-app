import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    type = 'default';

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.type = this.route.snapshot.queryParamMap.get('type') ?? 'default';
    }

    redirect() {
        if (this.type === 'notice') {
            this.router.navigate(['/notices']);
        } else {
            this.router.navigate(['/']);
        }
    }
}
