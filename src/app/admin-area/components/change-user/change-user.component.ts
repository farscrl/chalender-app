import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserFormService } from '../../../user-area/services/user-form.service';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
    selector: 'app-change-user',
    templateUrl: './change-user.component.html',
    styleUrls: ['./change-user.component.scss'],
    standalone: false
})
export class ChangeUserComponent {

    @Input()
    userId: string = '';

    didSubmit = false;
    showError = false;

    constructor(public ufs: UserFormService, private adminService: AdminService, private modal: NgbActiveModal) {
    }

    ngOnInit() {
        this.adminService.getUser(this.userId).subscribe(userDto => {
            this.ufs.setDto(userDto);
            this.ufs.initForm(true);
        });
    }

    update() {
        this.ufs.f.markAllAsTouched();

        if (!this.ufs.f.valid) {
            return;
        }

        this.didSubmit = true;
        this.showError = false;

        this.adminService.updateUser(this.userId, this.ufs.getDto()).subscribe({
            next: userDto => {
                this.ufs.setDto(userDto);
                this.modal.close();
            },
            error: error => {
                this.didSubmit = false;
                console.error(error);
                this.showError = true;
            }
        });
    }
}
