import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateNoticesSubscriptionComponent } from './deactivate-notices-subscription.component';

describe('DeactivateNoticesSubscriptionComponent', () => {
  let component: DeactivateNoticesSubscriptionComponent;
  let fixture: ComponentFixture<DeactivateNoticesSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DeactivateNoticesSubscriptionComponent]
});
    fixture = TestBed.createComponent(DeactivateNoticesSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
