import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingRtrComponent } from './tracking-rtr.component';

describe('TrackingRtrComponent', () => {
  let component: TrackingRtrComponent;
  let fixture: ComponentFixture<TrackingRtrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingRtrComponent]
    });
    fixture = TestBed.createComponent(TrackingRtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
