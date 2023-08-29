import {Component} from '@angular/core';
import {UserFormService} from "../../../services/user-form.service";
import {FormArray, FormControl} from "@angular/forms";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    public roles = [
        {description: 'Utilisader', value: 'ROLE_USER'},
        {description: "Moderatur", value: 'ROLE_MODERATOR'},
        {description: "Administrator", value: 'ROLE_ADMIN'}
    ];

    constructor(public ufs: UserFormService) {
    }

    onCheckChange(event: any) {
        const formArray: FormArray = this.ufs.f.get('roles') as FormArray;

        if (event?.target?.checked) {
            formArray.push(new FormControl(event.target.value));
        } else {
            formArray.controls.forEach((ctrl, idx) => {
                if (ctrl.value == event.target.value) {
                    formArray.removeAt(idx);
                    return;
                }
            });
        }
    }

    containsValue(role: string) {
        const formArray: FormArray = this.ufs.f.get('roles') as FormArray;
        return !!formArray.controls.find(cont => cont.value === role);
    }

}
