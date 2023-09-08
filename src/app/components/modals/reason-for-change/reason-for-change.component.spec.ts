import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonForChangeComponent } from './reason-for-change.component';

describe('ReasonForChangeComponent', () => {
  let component: ReasonForChangeComponent;
  let fixture: ComponentFixture<ReasonForChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonForChangeComponent]
    });
    fixture = TestBed.createComponent(ReasonForChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
