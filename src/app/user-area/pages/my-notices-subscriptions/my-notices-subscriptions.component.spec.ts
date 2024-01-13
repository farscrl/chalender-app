import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNoticesSubscriptionsComponent } from './my-notices-subscriptions.component';

describe('MyNoticesSubscriptionsComponent', () => {
  let component: MyNoticesSubscriptionsComponent;
  let fixture: ComponentFixture<MyNoticesSubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyNoticesSubscriptionsComponent]
    });
    fixture = TestBed.createComponent(MyNoticesSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
