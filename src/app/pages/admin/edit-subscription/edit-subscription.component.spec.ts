import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriptionComponent } from './edit-subscription.component';

describe('EditSubscriptionComponent', () => {
  let component: EditSubscriptionComponent;
  let fixture: ComponentFixture<EditSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubscriptionComponent]
    });
    fixture = TestBed.createComponent(EditSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
