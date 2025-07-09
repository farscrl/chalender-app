import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventButtonComponent } from './new-event-button.component';

describe('NewEventButtonComponent', () => {
  let component: NewEventButtonComponent;
  let fixture: ComponentFixture<NewEventButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NewEventButtonComponent]
});
    fixture = TestBed.createComponent(NewEventButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
