import { Component, ElementRef } from '@angular/core';
import { Document, Image, PublicationTypes } from '../../../shared/data/event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { DatesUtil } from '../../../shared/utils/dates.util';
import * as dayjs from 'dayjs';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { TermsComponent } from '../../../shared/components/terms/terms.component';
import { debounceTime, fromEvent, take } from 'rxjs';
import { NoticeBoardItemDto } from '../../../shared/data/notices';
import { NoticesService } from '../../../shared/services/notices.service';
import { NoticePreviewComponent } from '../../../components/notice-preview/notice-preview.component';

@Component({
    selector: 'app-new-notice',
    templateUrl: './new-notice.component.html',
    styleUrls: ['./new-notice.component.scss']
})
export class NewNoticeComponent {
    images: Image[] = [];
    documents: Document[] = [];
    isUploadingImage = false;
    isUploadingDocument = false;

    f: FormGroup = new FormGroup<any>({});

    isLoggedIn = false;
    isPreviewOpen = false;

    isSaving = false;

    private noticeToChangeId?: string;
    private noticeToChange?: NoticeBoardItemDto;
    private returnToModeratorView = false;

    constructor(
        private authService: AuthenticationService,
        private fb: FormBuilder,
        private noticesService: NoticesService,
        private modalService: NgbModal,
        private router: Router,
        private notificationsService: NotificationsService,
        private el: ElementRef,
        private datesUtil: DatesUtil
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
            const notice = navigation.extras.state['notice'];
            if (notice) {
                this.noticeToChangeId = notice.id;
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

        if (this.noticeToChangeId) {
            this.noticesService.getNotice(this.noticeToChangeId).subscribe(notice => {
                this.noticeToChange = notice;
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

        this.isSaving = true;
        const notice = this.transformToNoticeBoardItemDto(isDraft);

        if (this.noticeToChange) {
            notice.id = this.noticeToChange.id;
            this.noticesService.updateNotice(notice).subscribe({
                next: (notice: NoticeBoardItemDto) => {
                    this.notificationsService.successMessage(
                        'Creà l’annunzia',
                        "Ti has memorisà cun success l’annunzia «" + notice.title + "»."
                    );

                    if (this.returnToModeratorView) {
                        this.router.navigateByUrl('/moderator/notices');
                    } else {
                        this.router.navigateByUrl('/user/notices');
                    }
                    this.isSaving = false;
                },
                error: error => {
                    this.isSaving = false;
                    console.error(error)
                }
            });
        } else {
            this.noticesService.createNotice(notice).subscribe({
                next: (notice: NoticeBoardItemDto) => {
                    this.notificationsService.successMessage(
                        'Creà l\'endataziun',
                        "Ti has memorisà cun success l'endataziun «" + notice.title + "»."
                    );

                    if (this.isLoggedIn) {
                        if (this.returnToModeratorView) {
                            this.router.navigateByUrl('/moderator/notices');
                        } else {
                            this.router.navigateByUrl('/user/notices');
                        }
                    } else {
                        this.router.navigateByUrl('/');
                    }
                    this.isSaving = false;
                },
                error: err => {
                    this.isSaving = false;
                    console.error(err);
                }
            });
        }
    }

    preview(): void {
        this.isPreviewOpen = true;
        const dto = this.transformToNoticeBoardItemDto(true);
        const modalRef = this.modalService.open(NoticePreviewComponent, {size: 'xl', centered: true});
        modalRef.componentInstance.noticeDto = dto;
        modalRef.closed.subscribe(value => {
            this.isPreviewOpen = false;
        });
        modalRef.dismissed.subscribe(value => {
            this.isPreviewOpen = false;
        });
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }

    isFieldError(fieldName: string, errorName: string) {
        const field = this.f.get(fieldName)!;
        return field.hasError(errorName);
    }

    private initForm() {
        let contactEmail = '';
        this.isLoggedIn = false;
        if (this.authService.isLoggedIn()) {
            contactEmail = this.authService.getEmail();
            this.isLoggedIn = true;
        }

        if (this.noticeToChange) {
            this.images = this.noticeToChange.images;
            this.documents = this.noticeToChange.documents;
        }

        this.f = this.fb.group({
            contactEmail: [this.noticeToChange ? this.noticeToChange.contactEmail : '', [Validators.required, Validators.email]],
            title: [this.noticeToChange ? this.noticeToChange.title : '', Validators.required],
            description: [this.noticeToChange ? this.noticeToChange.description : '', [Validators.required, Validators.maxLength(1500)]],
            contactData: [this.noticeToChange ? this.noticeToChange.contactData : '', Validators.required],
            acceptTerms: [this.noticeToChange ? this.noticeToChange.acceptTerms : false, Validators.requiredTrue],
        });


        if (this.isLoggedIn) {
            this.f.get('contactEmail')!.disable();
        }
    }


    canSaveAsDraft(): boolean {
        if (!this.isLoggedIn) {
            return false;
        }

        if (this.noticeToChange && this.noticeToChange.status !== "DRAFT") {
            return false;
        }

        return true;
    }

    openTerms() {
        this.modalService.open(TermsComponent, {size: 'xl', centered: true});
    }

    get descriptionSize(): string {
        return this.f.get('description')?.value.length + ' / 1500';
    }

    private transformToNoticeBoardItemDto(isDraft: boolean): NoticeBoardItemDto {
        let newState: PublicationTypes = 'DRAFT';
        if (!isDraft) {
            newState = 'IN_REVIEW';
        }

        if (this.noticeToChange) {
            if (this.noticeToChange.status === 'IN_REVIEW' || this.noticeToChange.status === 'REJECTED') {
                newState = 'IN_REVIEW';
            } else if (this.noticeToChange.status === 'PUBLISHED' || this.noticeToChange.status === 'NEW_MODIFICATION') {
                newState = 'NEW_MODIFICATION';
            }
        }

        const noticeDto = this.f.value as NoticeBoardItemDto;
        noticeDto.status = newState;
        noticeDto.images = this.images;
        noticeDto.documents = this.documents;

        return noticeDto;
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
