import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../data/user";

@Injectable({
    providedIn: 'root'
})
export class UserFormService {
    f: FormGroup = new FormGroup<any>({});
    isInitialized = false;
    isAdmin = false;

    private userDto: UserDto = new UserDto();

    constructor(private fb: FormBuilder) {
    }

    setDto(userDto: UserDto) {
        this.userDto = userDto;
        this.initForm();
    }

    getDto(): UserDto {
        this.userDto.firstName = this.f.value.firstName;
        this.userDto.lastName = this.f.value.lastName;
        this.userDto.organisation = this.f.value.organisation;
        this.userDto.phone = this.f.value.phone;

        if (this.isAdmin) {
            this.userDto.roles = this.f.value.roles;
            this.userDto.email = this.f.value.email;
        }
        
        return this.userDto;
    }

    initForm(isAdmin = false) {
        this.isAdmin = isAdmin;

        this.f = this.fb.group({
            email: [this.userDto?.email, [Validators.required, Validators.email]],
            firstName: [this.userDto?.firstName, [Validators.required]],
            lastName: [this.userDto?.lastName, [Validators.required]],
            organisation: [this.userDto?.organisation],
            phone: [this.userDto?.phone],
            roles: new FormArray([]),
        });

        const formArray: FormArray = this.f.get('roles') as FormArray;
        this.userDto.roles?.forEach(role => {
            formArray.push(new FormControl(role));
        })

        if (!this.isAdmin) {
            this.f.controls['email'].disable();
        }

        this.isInitialized = true;
    }

    isFieldInvalid(fieldName: string) {
        return this.f.get(fieldName)!.invalid && (this.f.get(fieldName)!.dirty || this.f.get(fieldName)!.touched);
    }
}
