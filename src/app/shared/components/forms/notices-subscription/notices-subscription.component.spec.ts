import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesSubscriptionComponent } from './notices-subscription.component';

describe('NoticesSubscriptionComponent', () => {
  let component: NoticesSubscriptionComponent;
  let fixture: ComponentFixture<NoticesSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoticesSubscriptionComponent]
});
    fixture = TestBed.createComponent(NoticesSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
