import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorEventsComponent } from './moderator-events.component';

describe('ModeratorEventsComponent', () => {
  let component: ModeratorEventsComponent;
  let fixture: ComponentFixture<ModeratorEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorEventsComponent]
    });
    fixture = TestBed.createComponent(ModeratorEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
