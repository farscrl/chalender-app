import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDiffComponent } from './event-diff.component';

describe('EventDiffComponent', () => {
  let component: EventDiffComponent;
  let fixture: ComponentFixture<EventDiffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [EventDiffComponent]
});
    fixture = TestBed.createComponent(EventDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
