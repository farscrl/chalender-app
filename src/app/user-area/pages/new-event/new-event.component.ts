import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventPreviewComponent } from "../../../components/event-preview/event-preview.component";
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { EventLanguage, Genre, Region } from '../../../shared/data/static-data';
import { Document, EventDto, EventStatusTypes, Image } from '../../../shared/data/event';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { StaticDataService } from '../../../shared/services/static-data.service';
import { EventsService } from '../../../shared/services/events.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { minCheckboxValidator } from '../../../shared/validators/mincheckbox.validator';
import { debounceTime, fromEvent, take } from 'rxjs';

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
    documents: Document[] = [];
    isUploadingImage = false;
    isUploadingDocument = false;

    f: FormGroup = new FormGroup<any>({});

    isLoggedIn = false;
    isPreviewOpen = false;

    private eventToChangeId?: string;
    private eventToChange?: EventDto;
    private returnToModeratorView = false;

    constructor(
        private authService: AuthenticationService,
        private staticData: StaticDataService,
        private fb: FormBuilder,
        private eventsService: EventsService,
        private modalService: NgbModal,
        private router: Router,
        private notificationsService: NotificationsService,
        private el: ElementRef,
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
            const event = navigation.extras.state['event'];
            if (event) {
                this.eventToChangeId = event.id;
            }

            const returnToModeratorView = navigation.extras.state['returnToModeratorView'];
            if (returnToModeratorView) {
                this.returnToModeratorView = true;
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
                this.scrollToFirstInvalidControl();
                return;
            }
        }

        const event = this.transformToEventDto(isDraft);

        if (this.eventToChange) {
            event.id = this.eventToChange.id;
            this.eventsService.updateEvent(event).subscribe(event => {
                this.notificationsService.successMessage(
                    'Creà l\'occurrenza',
                    "Ti has memorisà cun success l'occurrenza «" + event.title + "»."
                );

                if (this.returnToModeratorView) {
                    this.router.navigateByUrl('/moderator/events');
                } else {
                    this.router.navigateByUrl('/user/events');
                }
            });
        } else {
            this.eventsService.createEvent(event).subscribe(event => {

                this.notificationsService.successMessage(
                    'Creà l\'occurrenza',
                    "Ti has memorisà cun success l'occurrenza «" + event.title + "»."
                );

                if (this.isLoggedIn) {
                    if (this.returnToModeratorView) {
                        this.router.navigateByUrl('/moderator/events');
                    } else {
                        this.router.navigateByUrl('/user/events');
                    }
                } else {
                    this.router.navigateByUrl('/');
                }
            });
        }
    }

    preview() {
        this.isPreviewOpen = true;
        const dto = this.transformToEventDto(true);
        const modalRef = this.modalService.open(EventPreviewComponent, {size: 'xl'});
        modalRef.componentInstance.eventDto = dto;
        modalRef.closed.subscribe(value => {
            this.isPreviewOpen = false;
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    isOccurrenceFieldInvalid(index: number, fieldName: string) {
        const occurrence = this.eventOccurrencesFormArray.at(index);
        return occurrence.get(fieldName)!.invalid && (occurrence.get(fieldName)!.dirty || occurrence.get(fieldName)!.touched);
    }

    isFieldError(fieldName: string, errorName: string) {
        const field = this.f.get(fieldName)!;
        return field.hasError(errorName);
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
            this.documents = this.eventToChange.documents;
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
            acceptTerms: [this.eventToChange ? this.eventToChange.acceptTerms : false, Validators.requiredTrue],
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
            this.setOnlyOnlineFields(val);
        });
        this.setOnlyOnlineFields(this.f.get('onlineOnly')!.value);
    }

    addOccurrences() {
        if (this.eventToChange) {
            this.eventToChange.occurrences.forEach((occurrence, idx) => {
                const o = this.fb.group({
                    date: [dayjs(occurrence.date, 'D-M-YYYY').format('YYYY-MM-DD'), Validators.required],
                    start: [occurrence.start, Validators.required],
                    end: [occurrence.end],
                    isAllDay: [occurrence.isAllDay],
                    isCancelled: [occurrence.isCancelled],
                });
                this.eventOccurrencesFormArray.push(o);
                this.setAllDayFields(idx);
            });
        } else {
            this.addNewOccurrence();
        }
    }

    addNewOccurrence() {
        const o = this.fb.group({
            date: ['', Validators.required],
            start: ['', Validators.required],
            end: [''],
            isAllDay: [false],
            isCancelled: [false],
        });
        this.eventOccurrencesFormArray.push(o);
    }

    removeOccurrence(occurrenceIndex: number): void {
        this.eventOccurrencesFormArray.removeAt(occurrenceIndex);
    }

    didToggleAllDay(occurrenceIndex: number): void {
        this.setAllDayFields(occurrenceIndex);
    }

    canSaveAsDraft(): boolean {
        if (!this.isLoggedIn) {
            return false;
        }

        if (this.eventToChange && this.eventToChange.status !== "DRAFT") {
            return false;
        }

        return true;
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
        eventDto.documents = this.documents;

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

    private setOnlyOnlineFields(value: any): void {
        if (value) {
            this.f.get('location')!.disable();
            this.f.get('address')!.disable();
        } else {
            this.f.get('location')!.enable();
            this.f.get('address')!.enable();
        }
    }

    private setAllDayFields(occurrenceIndex: number): void {
        const occurrence = this.eventOccurrencesFormArray.at(occurrenceIndex);
        if (occurrence.get('isAllDay')!.value) {
            occurrence.get('start')!.disable();
            occurrence.get('end')!.disable();
        } else {
            occurrence.get('start')!.enable();
            occurrence.get('end')!.enable();
        }
    }

    private scrollToFirstInvalidControl() {
        const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
            "form .ng-invalid"
        );

        window.scroll({
            top: this.getTopOffset(firstInvalidControl),
            left: 0,
            behavior: "smooth"
        });

        // focus field after scroll
        // https://medium.com/javascript-everyday/how-to-scroll-to-first-invalid-control-once-a-form-has-been-submitted-eb47d9fbc6e
        fromEvent(window, "scroll")
            .pipe(
                debounceTime(100),
                take(1)
            )
            .subscribe(() => firstInvalidControl.focus());
    }

    private getTopOffset(controlEl: HTMLElement): number {
        const labelOffset = 50;
        return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
    }
}
