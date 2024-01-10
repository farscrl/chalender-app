import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EventVersion } from '../../../shared/data/event';

type Reason = { id: string, description: string };

const reasonsAccept: Reason[] = [
    {id: 'no', description: 'Nagina remartga.'},

    {id: 'german', description: 'Per la proxima giada: Per plaschair emplenir il formular per rumantsch. Grazia fitg!'},

    {id: 'other', description: 'Auter'},
];

const reasonsRefuse: Reason[] = [
    {id: 'no', description: 'Nagina remartga.'},

    {
        id: 'german',
        description: 'Cuntegn tudestg. chalender.ch è ina plattafurma rumantscha. https://textshuttle.com/rm/ kann bei der Übersetzung helfen.'
    },
    {
        id: 'nonacceptable',
        description: 'Cuntegn che violescha las directivas da noss servetsch.'
    },
    {
        id: 'illegal',
        description: 'Cuntegn illegal.'
    },
    {
        id: 'tavlanaira',
        description: 'I na sa tracta betg dad in’occurrenza (classica). Nus publitgain gugent il text sco annunzia en la rubrica «tavla naira». Per plaschair anc inoltrar ina giada per la tavla naira. Grazia fitg!'
    },

    {id: 'other', description: 'Auter'},
];

const reasonsEdit: Reason[] = [
    {id: 'no', description: 'Nagina remartga.'},

    {id: 'orthografic', description: 'Mo curregì sbagls ortografics.'},
    {id: 'minor', description: 'Mo midà piculezzas.'},
    {id: 'web', description: 'Adattà tenor las infurmaziuns sin la pagina d\'internet.'},

    {id: 'other', description: 'Auter'},
];

@Component({
    selector: 'app-reason-for-change',
    templateUrl: './reason-for-change.component.html',
    styleUrls: ['./reason-for-change.component.scss']
})
export class ReasonForChangeComponent {
    @Input() event: EventVersion | undefined;
    @Input() type: 'accept' | 'refuse' | 'edit' | undefined;

    public f: FormGroup = new FormGroup({});

    reasons: Reason[] = [];

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        if (this.type === 'accept') {
            this.reasons = reasonsAccept;
        } else if (this.type === 'refuse') {
            this.reasons = reasonsRefuse;
        } else if (this.type === 'edit') {
            this.reasons = reasonsEdit;
        }

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
