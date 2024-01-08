import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeListItemComponent } from './notice-list-item.component';

describe('NoticeListItemComponent', () => {
  let component: NoticeListItemComponent;
  let fixture: ComponentFixture<NoticeListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeListItemComponent]
    });
    fixture = TestBed.createComponent(NoticeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
