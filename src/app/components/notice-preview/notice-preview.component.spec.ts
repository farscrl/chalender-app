import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePreviewComponent } from './notice-preview.component';

describe('NoticePreviewComponent', () => {
  let component: NoticePreviewComponent;
  let fixture: ComponentFixture<NoticePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoticePreviewComponent]
});
    fixture = TestBed.createComponent(NoticePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
