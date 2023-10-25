import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxFileDropEntry } from "ngx-file-drop";
import { concatMap, Subject } from "rxjs";
import { ImagesService } from "../../services/images.service";
import { Image } from '../../data/event';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

    @Input()
    allowedMimeTypes: string[] = [];

    @Output()
    fileAdded: EventEmitter<Image> = new EventEmitter<Image>();

    public dropZoneClassName = 'dropzone';
    public dropZoneContentClassName = 'dropzone-content';

    private uploadImagesQueue = new Subject<File>();

    constructor(private imagesService: ImagesService) {
        this.uploadImagesQueue.pipe(concatMap((file) => imagesService.uploadImage(file)))
            .subscribe((result) => {
                this.fileAdded.next(result);
                console.log(result);
            });
    }

    public dropped(files: NgxFileDropEntry[]) {
        this.dropZoneClassName = 'dropzone';

        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    if (!this.allowedMimeTypes.includes(file.type)) {
                        console.error('File type not allowed: ' + file.type);
                        return;
                    }

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

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
