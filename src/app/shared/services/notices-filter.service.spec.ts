import { TestBed } from '@angular/core/testing';

import { NoticesFilterService } from './notices-filter.service';

describe('NoticesFilterService', () => {
  let service: NoticesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
