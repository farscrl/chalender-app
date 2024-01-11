import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDiffComponent } from './notice-diff.component';

describe('NoticeDiffComponent', () => {
  let component: NoticeDiffComponent;
  let fixture: ComponentFixture<NoticeDiffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeDiffComponent]
    });
    fixture = TestBed.createComponent(NoticeDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
