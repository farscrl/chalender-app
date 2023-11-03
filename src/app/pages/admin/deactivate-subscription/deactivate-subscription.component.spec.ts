import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateSubscriptionComponent } from './deactivate-subscription.component';

describe('DeactivateSubscriptionComponent', () => {
  let component: DeactivateSubscriptionComponent;
  let fixture: ComponentFixture<DeactivateSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeactivateSubscriptionComponent]
    });
    fixture = TestBed.createComponent(DeactivateSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
