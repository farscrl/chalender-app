import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSubscriptionComponent } from './events-subscription.component';

describe('EventsSubscriptionComponent', () => {
  let component: EventsSubscriptionComponent;
  let fixture: ComponentFixture<EventsSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [EventsSubscriptionComponent]
});
    fixture = TestBed.createComponent(EventsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
