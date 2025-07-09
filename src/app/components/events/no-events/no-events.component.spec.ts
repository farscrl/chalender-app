import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEventsComponent } from './no-events.component';

describe('NoEventsComponent', () => {
  let component: NoEventsComponent;
  let fixture: ComponentFixture<NoEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoEventsComponent]
});
    fixture = TestBed.createComponent(NoEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
