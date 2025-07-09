import { Component, Input } from '@angular/core';
import { Document, Image } from '../../data/event';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ImagesService } from '../../services/images.service';
import { DocumentsService } from '../../services/documents.service';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    imports: [CdkDropList, CdkDrag, CdkDragHandle]
})
export class FileListComponent {

    @Input() files!: Document[] | Image[];

    @Input() isUploading = false;

    @Input()
    type: 'image' | 'document' = 'image';

    constructor(
        private imagesService: ImagesService,
        private documentsService: DocumentsService,
    ) {
    }

    reorderImages(event: CdkDragDrop<Document[] | Image[]>) {
        moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    }

    deleteFile(file: Document | Image) {
        if (this.type === 'image') {
            this.imagesService.unlinkImage(file.id!).subscribe(img => {
                const idx = this.files.findIndex((obj) => obj.id === file.id);
                this.files.splice(idx, 1);
            });
        } else {
            this.documentsService.unlinkImage(file.id!).subscribe(img => {
                const idx = this.files.findIndex((obj) => obj.id === file.id);
                this.files.splice(idx, 1);
            });
        }

    }
}
