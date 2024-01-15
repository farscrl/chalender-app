import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '../../../services/contact-form.service';
import { Message } from '../../../data/notifications';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
    f: FormGroup = new FormGroup<any>({});
    message = new Message('danger', '', '');
    isSending = false;

    constructor(
        private contactFormService: ContactFormService,
    ) {
        this.initForm();
    }

    onSubmit() {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        this.isSending = true;

        this.contactFormService.sendForm(this.f.value).subscribe(form => {
            this.message.type = 'success';
            this.message.title = 'Success';
            this.message.message = 'Tramess cun success il formular da contact.'

            this.initForm();
            this.isSending = false;
        }, error => {
            this.message.type = 'danger';
            this.message.title = 'Errur';
            this.message.message = 'Impussibel da trametter il formular. Emprova pli tard anc ina giada.'

            this.isSending = false;
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    private initForm() {
        this.f = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            message: new FormControl('', [Validators.required])
        });
    }
}
