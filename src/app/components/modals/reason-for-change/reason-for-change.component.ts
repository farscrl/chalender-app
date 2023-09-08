import {Component, Input} from '@angular/core';
import {EventVersion} from "../../../data/event";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-reason-for-change',
    templateUrl: './reason-for-change.component.html',
    styleUrls: ['./reason-for-change.component.scss']
})
export class ReasonForChangeComponent {
    @Input() event: EventVersion | undefined;
    @Input() type: 'accept' | 'refuse' | 'edit' | undefined;

    public f: FormGroup = new FormGroup({});

    reasons = [
        {id: 'no', description: 'Nagina remartga.'},
        {id: 'tudestg', description: 'Eveniment ei cumplettamain redigius per tudestg'},
        {id: 'b', description: 'b'},
        {id: 'other', description: 'auter'},

    ]

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    acceptReason() {
        const reason = this.f.get('reason')!.value;
        if (!reason) {
            return;
        }

        if (reason.id === 'other') {
            this.f.markAllAsTouched();
            if (!this.f.get('comment')!.value) {
                return;
            }
            this.activeModal.close(this.f.get('comment')!.value);
            return;
        }
        if (reason.id === 'no') {
            this.activeModal.close();
            return;
        }
        this.activeModal.close(this.f.get('reason')!.value.description);
    }

    private initForm() {
        this.f = new FormGroup({
            reason: new FormControl(''),
            comment: new FormControl('', [Validators.required]),
        });

        this.f.get('comment')!.disable();

        this.f.get('reason')!.valueChanges.subscribe(val => {
            if (val.id !== 'other') {
                this.f.get('comment')!.disable();
            } else {
                this.f.get('comment')!.enable();
            }
        });
    }
}
