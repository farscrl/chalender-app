import { TestBed } from '@angular/core/testing';

import { DatepickerTranslatorService } from './datepicker-translator.service';

describe('DatepickerTranslatorService', () => {
  let service: DatepickerTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatepickerTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
