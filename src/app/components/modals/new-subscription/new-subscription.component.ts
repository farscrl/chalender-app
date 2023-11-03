import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from '../../../data/subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-subscription',
    templateUrl: './new-subscription.component.html',
    styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent implements OnInit {
    @Input() subscription: Subscription | undefined;

    public f: FormGroup = new FormGroup({});

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    saveChanges() {
        this.f.markAllAsTouched();
        if (this.f.invalid) {
            return;
        }

        this.activeModal.close(this.f.value);
    }

    private initForm() {
        this.f = new FormGroup({
            name: new FormControl(this.subscription?.name ? this.subscription.name : 'Ocurrenzas da chalender.ch', [Validators.required]),
            type: new FormControl(this.subscription?.type ? this.subscription.type : 'WEEKLY', [Validators.required]),
            genres: new FormControl(this.subscription?.genres ? this.subscription.genres : []),
            regions: new FormControl(this.subscription?.regions ? this.subscription.regions : []),
            searchTerm: new FormControl(this.subscription?.searchTerm ? this.subscription.searchTerm : ''),
        });
    }
}
