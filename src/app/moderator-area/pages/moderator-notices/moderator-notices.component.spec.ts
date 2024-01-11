import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorNoticesComponent } from './moderator-notices.component';

describe('ModeratorNoticesComponent', () => {
  let component: ModeratorNoticesComponent;
  let fixture: ComponentFixture<ModeratorNoticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorNoticesComponent]
    });
    fixture = TestBed.createComponent(ModeratorNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
