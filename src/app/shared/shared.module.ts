import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserComponent } from './components/forms/user/user.component';
import { SortableDirective } from './directives/sortable.directive';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { ShortDomainPipe } from './pipes/short-domain.pipe';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SubscriptionComponent } from './components/forms/subscription/subscription.component';
import { NewEventButtonComponent } from './components/new-event-button/new-event-button.component';
import { RouterModule } from '@angular/router';
import { LinkyPipe } from './pipes/linky.pipe';
import { InfoButtonComponent } from './components/forms/info-button/info-button.component';


@NgModule({
    declarations: [
        PaginationComponent,
        UserComponent,
        SortableDirective,
        StatusBadgeComponent,
        ShortDomainPipe,
        FileUploadComponent,
        FileListComponent,
        SubscriptionComponent,
        NewEventButtonComponent,
        LinkyPipe,
        InfoButtonComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        TranslateModule,
        NgxFileDropModule,
        DragDropModule,
        RouterModule,
    ],
    exports: [
        // Export the same modules so they can be used in feature modules
        CommonModule, // It's a good practice to export CommonModule
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        TranslateModule,

        PaginationComponent,
        UserComponent,
        StatusBadgeComponent,
        FileUploadComponent,
        FileListComponent,
        SubscriptionComponent,
        NewEventButtonComponent,

        SortableDirective,

        LinkyPipe,
        ShortDomainPipe,
        InfoButtonComponent,
    ]
})
export class SharedModule {
}
