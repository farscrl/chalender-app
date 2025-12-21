import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DatesUtil } from '../utils/dates.util';

export function dateValidator(datesUtil: DatesUtil, allowPastIfEditing: boolean = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = (control as FormControl).value

        const val = datesUtil.isValidEventDate(selectedDate);
        if (val === 'past') {
            // If we're in edit mode and past dates are allowed, skip this validation
            // The FormArray-level validator will ensure at least one occurrence is in the future
            if (allowPastIfEditing) {
                return null;
            }
            return {'isInPast': true}
        } else if (val === 'too_far_future') {
            return {'isInFuture': true}
        }

        return null;
    }
}

/**
 * Validator for the occurrences FormArray that ensures at least one occurrence is in the future.
 * Use this when editing events to allow past occurrences as long as there's a future one.
 */
export function atLeastOneFutureOccurrenceValidator(datesUtil: DatesUtil): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
        const occurrences = (formArray as FormArray).controls;

        if (occurrences.length === 0) {
            return null; // Let the required validator handle empty arrays
        }

        const hasFutureOccurrence = occurrences.some(occurrence => {
            const dateControl = occurrence.get('date');
            if (!dateControl || !dateControl.value) {
                return false;
            }

            const val = datesUtil.isValidEventDate(dateControl.value);
            return val === null; // null means the date is valid (not in past or too far future)
        });

        return hasFutureOccurrence ? null : { 'noFutureOccurrence': true };
    };
}
