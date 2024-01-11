import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscriptionsNoticesComponent } from './my-subscriptions-notices.component';

describe('MySubscriptionsNoticesComponent', () => {
  let component: MySubscriptionsNoticesComponent;
  let fixture: ComponentFixture<MySubscriptionsNoticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySubscriptionsNoticesComponent]
    });
    fixture = TestBed.createComponent(MySubscriptionsNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
