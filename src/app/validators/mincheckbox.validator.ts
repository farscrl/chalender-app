import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from "@angular/forms";

export function minCheckboxValidator(minCheckbox = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const totalSelected = (control as FormArray).controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected >= minCheckbox ? null : {required: true};
    }
}
