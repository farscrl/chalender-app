import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesListTableComponent } from './notices-list-table.component';

describe('NoticesListTableComponent', () => {
  let component: NoticesListTableComponent;
  let fixture: ComponentFixture<NoticesListTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoticesListTableComponent]
});
    fixture = TestBed.createComponent(NoticesListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
