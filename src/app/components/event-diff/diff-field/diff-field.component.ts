import {Component, Input} from '@angular/core';
import {Diff} from "diff-match-patch";

@Component({
    selector: 'app-diff-field',
    templateUrl: './diff-field.component.html',
    styleUrls: ['./diff-field.component.scss'],
    standalone: false
})
export class DiffFieldComponent {

    @Input()
    diff: Diff[] = [];

    @Input()
    type: 'added' | 'removed' = 'added';
}
