import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoticesSubscriptionComponent } from './edit-notices-subscription.component';

describe('EditNoticesSubscriptionComponent', () => {
  let component: EditNoticesSubscriptionComponent;
  let fixture: ComponentFixture<EditNoticesSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNoticesSubscriptionComponent]
    });
    fixture = TestBed.createComponent(EditNoticesSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
