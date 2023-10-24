import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { StaticDataService } from "../../../services/static-data.service";
import { EventLanguage, Genre, Region } from "../../../data/static-data";
import { minCheckboxValidator } from "../../../validators/mincheckbox.validator";
import { EventDto, EventStatusTypes, Image } from "../../../data/event";
import { EventsService } from "../../../services/events.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventPreviewComponent } from "../../../components/event-preview/event-preview.component";
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { rmLocale } from '../../../utils/day-js-locale';
import { NotificationsService } from '../../../services/notifications.service';

const regexUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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

    images: Image[] = [];

    f: FormGroup = new FormGroup<any>({});

    isLoggedIn = false;

    private eventToChangeId?: string;
    private eventToChange?: EventDto;

    constructor(
        private authService: AuthenticationService,
        private staticData: StaticDataService,
        private fb: FormBuilder,
        private eventsService: EventsService,
        private modalService: NgbModal,
        private router: Router,
        private notificationsService: NotificationsService,
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
            const event = navigation.extras.state['event'];
            if (event) {
                this.eventToChangeId = event.id;
                console.log('eventToChangeId', this.eventToChangeId);
            }
        }
    }

    ngOnInit(): void {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.initForm();
        this.loadStaticData();

        if (this.eventToChangeId) {
            this.eventsService.getEvent(this.eventToChangeId).subscribe(event => {
                this.eventToChange = event;
                this.initForm();
            });
        }
    }

    onSubmit(isDraft: boolean) {
        this.f.markAllAsTouched();

        if (!isDraft) {
            if (!this.f.valid) {
                return;
            }
        }

        const event = this.transformToEventDto(isDraft);

        if (this.eventToChange) {
            event.id = this.eventToChange.id;
            this.eventsService.updateEvent(event).subscribe(event => {
                this.notificationsService.successMessage(
                    'Creà eveniment',
                    "Ti has memorisà cun success l'eveniment «" + event.title + "»."
                );

                this.router.navigateByUrl('/admin/events');
                // console.log(event);
                // this.eventToChange = event;
                // this.initForm();
            });
        } else {
            this.eventsService.createEvent(event).subscribe(event => {

                this.notificationsService.successMessage(
                    'Creà eveniment',
                    "Ti has memorisà cun success l'eveniment «" + event.title + "»."
                );

                if (this.isLoggedIn) {
                    this.router.navigateByUrl('/admin/events');
                } else {
                    this.router.navigateByUrl('/');
                }
                // console.log(event);
                // this.eventToChange = event;
                // this.initForm();
            });
        }
    }

    preview() {
        console.log(this.transformToEventDto(true));
        const dto = this.transformToEventDto(true);
        const modalRef = this.modalService.open(EventPreviewComponent, {size: 'xl'});
        modalRef.componentInstance.eventDto = dto;
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
            this.initForm();
        });

        this.staticData.getRegions().subscribe(regions => {
            if (!regions) {
                this.regions = [];
                return;
            }
            this.regions = regions;
            this.initForm();
        });

        this.staticData.getEventLanguages().subscribe(languages => {
            if (!languages) {
                this.eventLanguages = [];
                return;
            }

            this.eventLanguages = languages;
            this.initForm();
        });
    }

    private initForm() {
        let contactEmail = '';
        this.isLoggedIn = false;
        if (this.authService.isLoggedIn()) {
            contactEmail = this.authService.getEmail();
            this.isLoggedIn = true;
        }

        if (this.eventToChange) {
            this.images = this.eventToChange.images;
        }

        this.f = this.fb.group({
            contactEmail: [this.eventToChange ? this.eventToChange.contactEmail : '', [Validators.required, Validators.email]],
            title: [this.eventToChange ? this.eventToChange.title : '', Validators.required],
            description: [this.eventToChange ? this.eventToChange.description : '', [Validators.required, Validators.maxLength(750)]],
            genres: new FormArray([], minCheckboxValidator(1)),
            regions: new FormArray([], minCheckboxValidator(1)),
            eventLanguages: new FormArray([], minCheckboxValidator(1)),
            onlineOnly: [this.eventToChange ? this.eventToChange.onlineOnly : false],
            location: [this.eventToChange ? this.eventToChange.location : '', Validators.required],
            address: [this.eventToChange ? this.eventToChange.address : '', Validators.required],
            organiser: [this.eventToChange ? this.eventToChange.organiser : ''],
            contact: [this.eventToChange ? this.eventToChange.contact : ''],
            link: [this.eventToChange ? this.eventToChange.link : '', Validators.pattern(regexUrl)],
            pricing: [this.eventToChange ? this.eventToChange.pricing : ''],
            acceptTerms: [false, Validators.requiredTrue],
            occurrences: new FormArray([]),
        });
        this.addOccurrences();

        this.genres.forEach(genre => {
            this.genresFormArray.push(new FormControl(false));
        });
        this.reloadSelectedGenres();

        this.regions.forEach(region => {
            this.regionsFormArray.push(new FormControl(false));
        });
        this.reloadSelectedRegions();

        this.eventLanguages.forEach(language => {
            this.eventLanguagesFormArray.push(new FormControl(false));
        });
        this.reloadSelectedEventLanguages();

        if (this.isLoggedIn) {
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

    addOccurrences() {
        if (this.eventToChange) {
            this.eventToChange.occurrences.forEach(occurrence => {
                const o = this.fb.group({
                    date: [dayjs(occurrence.date, 'D-M-YYYY').format('YYYY-MM-DD'), Validators.required],
                    start: [occurrence.start, Validators.required],
                    end: [occurrence.end],
                    isAllDay: [occurrence.isAllDay],
                    isCancelled: [occurrence.isCancelled],
                });
                this.eventOccurrencesFormArray.push(o);
            });
        } else {
            const o = this.fb.group({
                date: ['', Validators.required],
                start: ['', Validators.required],
                end: [''],
                isAllDay: [false],
                isCancelled: [false],
            });
            this.eventOccurrencesFormArray.push(o);
        }
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

    private transformToEventDto(isDraft: boolean): EventDto {
        let newState: EventStatusTypes = 'DRAFT';
        if (!isDraft) {
            newState = 'IN_REVIEW';
        }

        if (this.eventToChange) {
            if (this.eventToChange.status === 'IN_REVIEW' || this.eventToChange.status === 'REJECTED') {
                newState = 'IN_REVIEW';
            } else if (this.eventToChange.status === 'PUBLISHED' || this.eventToChange.status === 'NEW_MODIFICATION') {
                newState = 'NEW_MODIFICATION';
            }
        }

        const eventDto = this.f.value as EventDto;
        eventDto.status = newState;
        eventDto.genres = this.transformFormArrayToDto('genres', this.genres);
        eventDto.regions = this.transformFormArrayToDto('regions', this.regions);
        eventDto.eventLanguages = this.transformFormArrayToDto('eventLanguages', this.eventLanguages);

        eventDto.occurrences = this.transformOccurrencesToDto(this.eventOccurrencesFormArray.value);
        eventDto.images = this.images;

        return eventDto;
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

    private transformOccurrencesToDto(occurrences: any[]): any[] {
        const dto: any[] = [];
        occurrences.forEach(occurrence => {
            dto.push({
                date: dayjs(occurrence.date).format('DD-MM-YYYY'),
                start: occurrence.start,
                end: occurrence.end,
                isAllDay: occurrence.isAllDay,
                isCancelled: occurrence.isCancelled,
            });
        });
        return dto;
    }

    private reloadSelectedGenres() {
        this.genresFormArray.controls.forEach((control, i) => {
            control.setValue(false);
            if (this.eventToChange) {
                if (this.eventToChange.genres.find(genre => genre.id === this.genres[i].id)) {
                    control.setValue(true);
                }
            }
        });
    }

    private reloadSelectedRegions() {
        this.regionsFormArray.controls.forEach((control, i) => {
            control.setValue(false);
            if (this.eventToChange) {
                if (this.eventToChange.regions.find(region => region.id === this.regions[i].id)) {
                    control.setValue(true);
                }
            }
        });
    }

    private reloadSelectedEventLanguages() {
        this.eventLanguagesFormArray.controls.forEach((control, i) => {
            control.setValue(false);
            if (this.eventToChange) {
                if (this.eventToChange.eventLanguages.find(lang => lang.id === this.eventLanguages[i].id)) {
                    control.setValue(true);
                }
            }
        });
    }
}
