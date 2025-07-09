import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterModalComponent } from './event-filter-modal.component';

describe('EventFilterModalComponent', () => {
  let component: EventFilterModalComponent;
  let fixture: ComponentFixture<EventFilterModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [EventFilterModalComponent]
});
    fixture = TestBed.createComponent(EventFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
