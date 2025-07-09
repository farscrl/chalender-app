import { Component, Input } from '@angular/core';
import { Diff, diff_match_patch } from 'diff-match-patch';
import { NoticeBoardItemVersion } from '../../shared/data/notices';

@Component({
    selector: 'app-notice-diff',
    templateUrl: './notice-diff.component.html',
    styleUrls: ['./notice-diff.component.scss'],
    standalone: false
})
export class NoticeDiffComponent {
    @Input()
    oldVersion: NoticeBoardItemVersion = new NoticeBoardItemVersion();

    @Input()
    newVersion: NoticeBoardItemVersion = new NoticeBoardItemVersion();

    titleDiff: Diff[] = [];
    descriptionDiff: Diff[] = [];
    genresDiff: Diff[] = [];
    contactDataDiff: Diff[] = [];

    constructor() {
    }

    ngOnInit() {
        const diff = new diff_match_patch();

        this.titleDiff = diff.diff_main(this.oldVersion.title ?? '', this.newVersion.title ?? '');
        diff.diff_cleanupSemantic(this.titleDiff);

        this.descriptionDiff = diff.diff_main(this.oldVersion.description ?? '', this.newVersion.description ?? '');
        diff.diff_cleanupSemantic(this.descriptionDiff);

        const oldGenres = this.oldVersion.genres?.map(g => g.name).join(', ') ?? '';
        const newGenres = this.newVersion.genres?.map(g => g.name).join(', ') ?? '';
        this.genresDiff = diff.diff_main(oldGenres, newGenres);
        diff.diff_cleanupSemantic(this.genresDiff);


        this.contactDataDiff = diff.diff_main(this.oldVersion.contactData ?? '', this.newVersion.contactData ?? '');
        diff.diff_cleanupSemantic(this.contactDataDiff);
    }
}
