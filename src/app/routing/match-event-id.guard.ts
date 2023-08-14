import {CanMatchFn, Route, UrlSegment} from '@angular/router';

export const canMatchEventId: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  // TODO: update with condition for real events
  const id = segments[0].path;
  return isNumber(id);
}

function isNumber(value?: string | number): boolean {
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}
