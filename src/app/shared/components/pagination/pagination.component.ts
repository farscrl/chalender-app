import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,} from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: false
})
export class PaginationComponent implements OnChanges {
    @Input() current: number = 0;
    @Input() total: number = 1;

    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

    public pages: number[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (
            (changes["current"] && changes["current"].currentValue) ||
            (changes["total"] && changes["total"].currentValue)
        ) {
            this.pages = this.getPages(this.current, this.total);
        }
    }

    public onGoTo(page: number): void {
        this.goTo.emit(page);
    }

    public onNext(): void {
        this.goTo.emit(this.current + 1);
    }

    public onPrevious(): void {
        this.goTo.emit(this.current - 1);
    }

    private getPages(current: number, total: number): number[] {
        if (total <= 7) {
            return [...Array(total).keys()];
        }

        if (current > 4) {
            if (current >= total - 4) {
                return [1, -1, total - 5, total - 4, total - 3, total - 2, total - 1];
            } else {
                return [1, -1, current - 1, current, current + 1, -1, total - 1];
            }
        }

        return [0, 1, 2, 3, 4, -1, total - 1];
    }
}
