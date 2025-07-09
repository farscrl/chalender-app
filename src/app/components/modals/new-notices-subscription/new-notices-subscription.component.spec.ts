import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoticesSubscriptionComponent } from './new-notices-subscription.component';

describe('NewNoticesSubscriptionComponent', () => {
  let component: NewNoticesSubscriptionComponent;
  let fixture: ComponentFixture<NewNoticesSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NewNoticesSubscriptionComponent]
});
    fixture = TestBed.createComponent(NewNoticesSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
