import { Component, Input } from '@angular/core';
import { File, Image } from '../../data/event';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ImagesService } from '../../services/images.service';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss']
})
export class FileListComponent {

    @Input() files!: File[] | Image[];

    @Input()
    type: 'image' | 'file' = 'image';

    constructor(private imagesService: ImagesService) {
    }

    reorderImages(event: CdkDragDrop<File[] | Image[]>) {
        moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    }

    deleteFile(file: File | Image) {
        this.imagesService.unlinkImage(file.id!).subscribe(img => {
            const idx = this.files.findIndex((obj) => obj.id === file.id);
            this.files.splice(idx, 1);
        });
    }
}
