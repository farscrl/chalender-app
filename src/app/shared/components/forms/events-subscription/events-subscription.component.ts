import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventsSubscription } from '../../../data/subscription';
import { Genre, Region } from '../../../data/static-data';
import { FormArray, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaticDataService } from '../../../services/static-data.service';
import { EventsSubscriptionsService } from '../../../services/events-subscriptions.service';
import { InfoButtonComponent } from '../info-button/info-button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-events-subscription',
    templateUrl: './events-subscription.component.html',
    styleUrls: ['./events-subscription.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, InfoButtonComponent, TranslatePipe]
})
export class EventsSubscriptionComponent {

    @Input() subscription: EventsSubscription | undefined;
    @Output() success: EventEmitter<void> = new EventEmitter<void>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    // static data
    genres: Genre[] = [];
    regions: Region[] = [];

    public f: FormGroup = new FormGroup({});

    constructor(
        private staticData: StaticDataService,
        private subscriptionsService: EventsSubscriptionsService,
    ) {
    }

    ngOnInit(): void {
        this.loadStaticData();
        this.initForm();
    }

    get genresFormArray(): FormArray {
        return this.f.get('genres') as FormArray;
    }

    get regionsFormArray(): FormArray {
        return this.f.get('regions') as FormArray;
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
        subscriptionToSave.genres = this.transformFormArrayToDto('genres', this.genres);
        subscriptionToSave.regions = this.transformFormArrayToDto('regions', this.regions);

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
            name: new FormControl(this.subscription?.name ? this.subscription.name : 'Ocurrenzas da chalender.ch', [Validators.required]),
            type: new FormControl(this.subscription?.type ? this.subscription.type : 'WEEKLY', [Validators.required]),
            genres: new FormArray([]),
            regions: new FormArray([]),
            searchTerm: new FormControl(this.subscription?.searchTerm ? this.subscription.searchTerm : ''),
            active: new FormControl(this.subscription ? this.subscription.active : true),
        });

        this.genres.forEach(genre => {
            this.genresFormArray.push(new FormControl(false));
        });
        this.reloadSelectedGenres();

        this.regions.forEach(region => {
            this.regionsFormArray.push(new FormControl(false));
        });
        this.reloadSelectedRegions();
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
    }

    private reloadSelectedGenres() {
        this.genresFormArray.controls.forEach((control, i) => {
            control.setValue(false);
            if (this.subscription) {
                if (this.subscription.genres.find(genre => genre.id === this.genres[i].id)) {
                    control.setValue(true);
                }
            }
        });
    }

    private reloadSelectedRegions() {
        this.regionsFormArray.controls.forEach((control, i) => {
            control.setValue(false);
            if (this.subscription) {
                if (this.subscription.regions.find(region => region.id === this.regions[i].id)) {
                    control.setValue(true);
                }
            }
        });
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
