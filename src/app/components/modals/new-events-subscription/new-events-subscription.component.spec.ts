import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventsSubscriptionComponent } from './new-events-subscription.component';

describe('NewEventsSubscriptionComponent', () => {
  let component: NewEventsSubscriptionComponent;
  let fixture: ComponentFixture<NewEventsSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NewEventsSubscriptionComponent]
});
    fixture = TestBed.createComponent(NewEventsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
