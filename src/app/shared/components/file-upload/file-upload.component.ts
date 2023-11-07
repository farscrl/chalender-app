import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxFileDropEntry } from "ngx-file-drop";
import { concatMap, Subject } from "rxjs";
import { ImagesService } from "../../services/images.service";
import { Document, Image } from '../../data/event';
import { DocumentsService } from '../../services/documents.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

    @Input()
    allowedMimeTypes: string[] = [];

    @Input()
    isUploading = false;

    @Output()
    fileAdded: EventEmitter<Image | Document> = new EventEmitter<Image | Document>();

    @Input()
    type: 'image' | 'document' = 'image';

    public dropZoneClassName = 'dropzone';
    public dropZoneContentClassName = 'dropzone-content';

    public showFormatError = false;

    private uploadImagesQueue = new Subject<File>();

    constructor(
        imagesService: ImagesService,
        documentsService: DocumentsService,
    ) {
        this.uploadImagesQueue.pipe(concatMap((file) => {
            this.isUploading = true;
            if (this.type === 'image') {
                return imagesService.uploadImage(file);
            } else {
                return documentsService.uploadDocument(file);
            }
        }))
            .subscribe((result) => {
                this.isUploading = false;
                this.fileAdded.next(result);
            });
    }

    public dropped(files: NgxFileDropEntry[]) {
        this.showFormatError = false;
        this.dropZoneClassName = 'dropzone';

        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    if (!this.allowedMimeTypes.includes(file.type)) {
                        this.showFormatError = true;
                        console.error('File type not allowed: ' + file.type);
                        return;
                    }

                    // add file to queue, so files are uploaded one after another
                    this.uploadImagesQueue.next(file);
                });
            } else {
                // ignoring directories
            }
        }
    }

    public fileOver(event: DragEvent) {
        if (event.dataTransfer) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (!this.allowedMimeTypes.includes(event.dataTransfer.items[i].type)) {
                    this.dropZoneClassName = 'dropzone dropzone-denied';
                    return;
                }
            }
        }

        this.dropZoneClassName = 'dropzone dropzone-allowed';
    }

    public fileLeave(event: any) {
        this.dropZoneClassName = 'dropzone';
    }
}
