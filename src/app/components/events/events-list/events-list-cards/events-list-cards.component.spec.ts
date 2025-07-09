import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListCardsComponent } from './events-list-cards.component';

describe('EventsListCardsComponent', () => {
  let component: EventsListCardsComponent;
  let fixture: ComponentFixture<EventsListCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [EventsListCardsComponent]
});
    fixture = TestBed.createComponent(EventsListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
