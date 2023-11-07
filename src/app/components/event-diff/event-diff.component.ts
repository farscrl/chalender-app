import { Component, Input, OnInit } from '@angular/core';
import { Diff, diff_match_patch } from "diff-match-patch";
import { EventVersion } from '../../shared/data/event';

@Component({
    selector: 'app-event-diff',
    templateUrl: './event-diff.component.html',
    styleUrls: ['./event-diff.component.scss']
})
export class EventDiffComponent implements OnInit {

    @Input()
    oldEventVersion: EventVersion = new EventVersion();

    @Input()
    newEventVersion: EventVersion = new EventVersion();

    titleDiff: Diff[] = [];
    descriptionDiff: Diff[] = [];
    genresDiff: Diff[] = [];
    regionsDiff: Diff[] = [];
    eventLanguagesDiff: Diff[] = [];
    locationDiff: Diff[] = [];
    addressDiff: Diff[] = [];
    onlyOnlineDiff: Diff[] = [];
    organiserDiff: Diff[] = [];
    pricingDiff: Diff[] = [];
    linkDiff: Diff[] = [];
    contactDiff: Diff[] = [];

    ngOnInit() {
        const diff = new diff_match_patch();

        this.titleDiff = diff.diff_main(this.oldEventVersion.title ?? '', this.newEventVersion.title ?? '');
        diff.diff_cleanupSemantic(this.titleDiff);

        this.descriptionDiff = diff.diff_main(this.oldEventVersion.description ?? '', this.newEventVersion.description ?? '');
        diff.diff_cleanupSemantic(this.descriptionDiff);

        const oldGenres = this.oldEventVersion.genres?.map(g => g.name).join(', ') ?? '';
        const newGenres = this.newEventVersion.genres?.map(g => g.name).join(', ') ?? '';
        this.genresDiff = diff.diff_main(oldGenres, newGenres);
        diff.diff_cleanupSemantic(this.genresDiff);

        const oldRegions = this.oldEventVersion.regions?.map(g => g.name).join(', ') ?? '';
        const newRegions = this.newEventVersion.regions?.map(g => g.name).join(', ') ?? '';
        this.regionsDiff = diff.diff_main(oldRegions, newRegions);
        diff.diff_cleanupSemantic(this.regionsDiff);

        const oldEventLanguages = this.oldEventVersion.eventLanguages?.map(g => g.name).join(', ') ?? '';
        const newEventLanguages = this.newEventVersion.eventLanguages?.map(g => g.name).join(', ') ?? '';
        this.eventLanguagesDiff = diff.diff_main(oldEventLanguages, newEventLanguages);
        diff.diff_cleanupSemantic(this.eventLanguagesDiff);

        this.locationDiff = diff.diff_main(this.oldEventVersion.location ?? '', this.newEventVersion.location ?? '');
        diff.diff_cleanupSemantic(this.locationDiff);

        this.addressDiff = diff.diff_main(this.oldEventVersion.address ?? '', this.newEventVersion.address ?? '');
        diff.diff_cleanupSemantic(this.addressDiff);

        this.onlyOnlineDiff = diff.diff_main(this.oldEventVersion.onlineOnly?.toString() ?? '', this.newEventVersion.onlineOnly?.toString() ?? '');
        diff.diff_cleanupSemantic(this.onlyOnlineDiff);

        this.organiserDiff = diff.diff_main(this.oldEventVersion.organiser ?? '', this.newEventVersion.organiser ?? '');
        diff.diff_cleanupSemantic(this.organiserDiff);

        this.pricingDiff = diff.diff_main(this.oldEventVersion.pricing ?? '', this.newEventVersion.pricing ?? '');
        diff.diff_cleanupSemantic(this.pricingDiff);

        this.linkDiff = diff.diff_main(this.oldEventVersion.link ?? '', this.newEventVersion.link ?? '');
        diff.diff_cleanupSemantic(this.linkDiff);

        this.contactDiff = diff.diff_main(this.oldEventVersion.contact ?? '', this.newEventVersion.contact ?? '');
        diff.diff_cleanupSemantic(this.contactDiff);
    }
}
