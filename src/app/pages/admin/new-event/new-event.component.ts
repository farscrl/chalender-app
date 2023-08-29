import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {StaticDataService} from "../../../services/static-data.service";
import {EventLanguage, Genre, Region} from "../../../data/static-data";
import {minCheckboxValidator} from "../../../validators/mincheckbox.validator";
import {Event, EventVersion} from "../../../data/event";
import {EventsService} from "../../../services/events.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventPreviewComponent} from "../../../components/event-preview/event-preview.component";

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

    // static data
    genres: Genre[] = [];
    regions: Region[] = [];
    eventLanguages: EventLanguage[] = [];

    f: FormGroup = new FormGroup<any>({});

    constructor(
        private authService: AuthenticationService,
        private staticData: StaticDataService,
        private fb: FormBuilder,
        private eventsService: EventsService,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.loadStaticData();
    }

    onSubmit(isDraft: boolean) {
        this.f.markAllAsTouched();

        if (!this.f.valid) {
            return;
        }

        const event = this.transformToEvent(isDraft);
        this.eventsService.createEvent(event).subscribe(event => {
            console.log(event);
        });
    }

    preview() {
        console.log(this.transformToEvent(true));
        const modalRef = this.modalService.open(EventPreviewComponent, {size: 'xl'});
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    isOccurrenceFieldInvalid(index: number, fieldName: string) {
        const occurrence = this.eventOccurrencesFormArray.at(index);
        return occurrence.get(fieldName)!.invalid && (occurrence.get(fieldName)!.dirty || occurrence.get(fieldName)!.touched);
    }

    get genresFormArray(): FormArray {
        return this.f.get('genres') as FormArray;
    }

    get regionsFormArray(): FormArray {
        return this.f.get('regions') as FormArray;
    }

    get eventLanguagesFormArray(): FormArray {
        return this.f.get('eventLanguages') as FormArray;
    }

    get eventOccurrencesFormArray(): FormArray {
        return this.f.get('occurrences') as FormArray;
    }

    private loadStaticData() {
        this.staticData.getGenres().subscribe(genres => {
            if (!genres) {
                this.genres = [];
                return;
            }

            this.genres = genres;
            genres.forEach(genre => {
                this.genresFormArray.push(new FormControl(false));
            });
        });

        this.staticData.getRegions().subscribe(regions => {
            if (!regions) {
                this.regions = [];
                return;
            }
            this.regions = regions;
            regions.forEach(region => {
                this.regionsFormArray.push(new FormControl(false));
            });
        });

        this.staticData.getEventLanguages().subscribe(languages => {
            if (!languages) {
                this.eventLanguages = [];
                return;
            }

            this.eventLanguages = languages;
            languages.forEach(language => {
                this.eventLanguagesFormArray.push(new FormControl(false));
            });
        });
    }

    private initForm() {
        let contactEmail = '';
        let isLoggedIn = false;
        if (this.authService.isLoggedIn()) {
            contactEmail = this.authService.getEmail();
            isLoggedIn = true;
        }

        this.f = this.fb.group({
            contactEmail: [contactEmail, [Validators.required, Validators.email]],
            title: ['', Validators.required],
            description: ['', [Validators.required, Validators.maxLength(750)]],
            genres: new FormArray([], minCheckboxValidator(1)),
            regions: new FormArray([], minCheckboxValidator(1)),
            eventLanguages: new FormArray([], minCheckboxValidator(1)),
            onlineOnly: [false],
            location: ['', Validators.required],
            address: ['', Validators.required],
            organiser: [''],
            pricing: [''],
            acceptTerms: [false, Validators.requiredTrue],
            occurrences: new FormArray([]), // TODO: add validator at least one occurrence
        });
        this.addOccurrence();

        if (isLoggedIn) {
            this.f.get('contactEmail')!.disable();
        }

        this.f.get('onlineOnly')!.valueChanges.subscribe(val => {
            if (val) {
                this.f.get('location')!.disable();
                this.f.get('address')!.disable();
            } else {
                this.f.get('location')!.enable();
                this.f.get('address')!.enable();
            }

        });
    }

    addOccurrence() {
        const occurrence = this.fb.group({
            date: ['', Validators.required],
            start: ['', Validators.required],
            end: [''],
            isAllDay: [false],
            isCancelled: [false],
        });
        this.eventOccurrencesFormArray.push(occurrence);
    }

    removeOccurrence(occurrenceIndex: number): void {
        this.eventOccurrencesFormArray.removeAt(occurrenceIndex);
    }

    didToggleAllDay(occurrenceIndex: number): void {
        const occurrence = this.eventOccurrencesFormArray.at(occurrenceIndex);
        if (occurrence.get('isAllDay')!.value) {
            occurrence.get('start')!.disable();
            occurrence.get('end')!.disable();
        } else {
            occurrence.get('start')!.enable();
            occurrence.get('end')!.enable();
        }
    }

    private transformToEvent(isDraft: boolean): Event {
        const eventVersion = this.f.value as EventVersion;
        eventVersion.genres = this.transformFormArrayToDto('genres', this.genres);
        eventVersion.regions = this.transformFormArrayToDto('regions', this.regions);
        eventVersion.eventLanguages = this.transformFormArrayToDto('eventLanguages', this.eventLanguages);

        if (isDraft) {
            return {
                draft: eventVersion,
                versions: [],
            }
        }

        return {
            waitingForReview: eventVersion,
            versions: [],
        };
    }

    private transformFormArrayToDto(field: string, data: any[]): any[] {
        const formArray = this.f.get(field) as FormArray;
        const dto: any[] = [];
        formArray.controls.forEach((control, i) => {
            if (control.value) {
                dto.push(data[i]);
            }
        });
        return dto;
    }
}
