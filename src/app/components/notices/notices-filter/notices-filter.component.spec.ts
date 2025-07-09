import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesFilterComponent } from './notices-filter.component';

describe('NoticesFilterComponent', () => {
  let component: NoticesFilterComponent;
  let fixture: ComponentFixture<NoticesFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoticesFilterComponent]
});
    fixture = TestBed.createComponent(NoticesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
