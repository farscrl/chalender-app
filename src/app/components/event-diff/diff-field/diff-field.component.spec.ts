import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffFieldComponent } from './diff-field.component';

describe('DiffFieldComponent', () => {
  let component: DiffFieldComponent;
  let fixture: ComponentFixture<DiffFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiffFieldComponent]
    });
    fixture = TestBed.createComponent(DiffFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
