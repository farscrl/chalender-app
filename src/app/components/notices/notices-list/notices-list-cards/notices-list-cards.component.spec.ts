import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesListCardsComponent } from './notices-list-cards.component';

describe('NoticesListCardsComponent', () => {
  let component: NoticesListCardsComponent;
  let fixture: ComponentFixture<NoticesListCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoticesListCardsComponent]
});
    fixture = TestBed.createComponent(NoticesListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
