import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetailsComponent } from './events-details.component';

describe('EventsDetailsComponent', () => {
  let component: EventsDetailsComponent;
  let fixture: ComponentFixture<EventsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [EventsDetailsComponent]
});
    fixture = TestBed.createComponent(EventsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
