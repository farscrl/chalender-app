import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventsSubscription, NoticesSubscription } from '../../../data/subscription';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsSubscriptionsService } from '../../../services/notifications-subscriptions.service';

@Component({
    selector: 'app-notices-subscription',
    templateUrl: './notices-subscription.component.html',
    styleUrls: ['./notices-subscription.component.scss'],
    standalone: false
})
export class NoticesSubscriptionComponent {

    @Input() subscription: NoticesSubscription | undefined;
    @Output() success: EventEmitter<void> = new EventEmitter<void>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


    public f: FormGroup = new FormGroup({});

    constructor(
        private subscriptionsService: NotificationsSubscriptionsService,
    ) {
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

        const subscriptionToSave = this.f.value as EventsSubscription;
        subscriptionToSave.id = this.subscription?.id;

        if (this.subscription?.id && this.subscription.id !== 'xxx') {
            this.subscriptionsService.updateSubscription(subscriptionToSave).subscribe(() => {
                this.success.emit();
            });
        } else {
            this.subscriptionsService.createSubscription(subscriptionToSave).subscribe(() => {
                this.success.emit();
            });
        }
    }

    private initForm() {
        this.f = new FormGroup({
            name: new FormControl(this.subscription?.name ? this.subscription.name : 'Annunzias da chalender.ch', [Validators.required]),
            type: new FormControl(this.subscription?.type ? this.subscription.type : 'WEEKLY', [Validators.required]),
            genres: new FormArray([]),
            regions: new FormArray([]),
            searchTerm: new FormControl(this.subscription?.searchTerm ? this.subscription.searchTerm : ''),
            active: new FormControl(this.subscription ? this.subscription.active : true),
        });
    }
}
