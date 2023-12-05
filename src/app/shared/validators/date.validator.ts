import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DatesUtil } from '../utils/dates.util';

export function dateValidator(datesUtil: DatesUtil): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = (control as FormControl).value

        const val = datesUtil.isValidEventDate(selectedDate);
        if (val === 'past') {
            return {'isInPast': true}
        } else if (val === 'too_far_future') {
            return {'isInFuture': true}
        }

        return null;
    }
}
