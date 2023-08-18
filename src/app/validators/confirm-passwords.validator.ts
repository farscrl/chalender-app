import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmPasswordsValidator(nameField1: string, nameField2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value[nameField1] === control.value[nameField2]
            ? null
            : {PasswordNoMatch: true};
    }
}
