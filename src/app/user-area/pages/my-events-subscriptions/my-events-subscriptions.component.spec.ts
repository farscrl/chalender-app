import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsSubscriptionsComponent } from './my-events-subscriptions.component';

describe('MyEventsSubscriptionsComponent', () => {
  let component: MyEventsSubscriptionsComponent;
  let fixture: ComponentFixture<MyEventsSubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventsSubscriptionsComponent]
    });
    fixture = TestBed.createComponent(MyEventsSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
