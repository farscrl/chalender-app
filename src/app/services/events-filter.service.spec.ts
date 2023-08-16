import { TestBed } from '@angular/core/testing';

import { EventsFilterService } from './events-filter.service';

describe('EventsFilterService', () => {
  let service: EventsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
