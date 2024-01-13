import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateEventsSubscriptionComponent } from './deactivate-events-subscription.component';

describe('DeactivateEventsSubscriptionComponent', () => {
  let component: DeactivateEventsSubscriptionComponent;
  let fixture: ComponentFixture<DeactivateEventsSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeactivateEventsSubscriptionComponent]
    });
    fixture = TestBed.createComponent(DeactivateEventsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
