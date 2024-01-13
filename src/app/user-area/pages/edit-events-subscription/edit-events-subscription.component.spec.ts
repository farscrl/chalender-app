import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventsSubscriptionComponent } from './edit-events-subscription.component';

describe('EditEventsSubscriptionComponent', () => {
  let component: EditEventsSubscriptionComponent;
  let fixture: ComponentFixture<EditEventsSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEventsSubscriptionComponent]
    });
    fixture = TestBed.createComponent(EditEventsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
