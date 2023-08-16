import {CanMatchFn, Route, UrlSegment} from '@angular/router';

export const canMatchEventId: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const id = segments[0].path;
    if (!id) {
        return false;
    }
    return id.length === 24;
    //return isNumber(id);
}

function isNumber(value?: string | number): boolean {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}
