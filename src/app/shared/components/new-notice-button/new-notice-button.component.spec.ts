import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoticeButtonComponent } from './new-notice-button.component';

describe('NewNoticeButtonComponent', () => {
  let component: NewNoticeButtonComponent;
  let fixture: ComponentFixture<NewNoticeButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NewNoticeButtonComponent]
});
    fixture = TestBed.createComponent(NewNoticeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
