import { CanDeactivateFn } from '@angular/router';
import { NewEventComponent } from '../user-area/pages/new-event/new-event.component';

export function eventFormFilledGuard(): CanDeactivateFn<NewEventComponent> {
    return (component: NewEventComponent, route, state) => {
        if (component.isPreviewOpen) {
            console.log('Preview is open, disabling navigation');
            return false;
        }

        console.log('Preview is not open, allowing navigation');
        return true;
    }
}
