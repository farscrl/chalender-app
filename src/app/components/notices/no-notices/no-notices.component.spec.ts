import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoNoticesComponent } from './no-notices.component';

describe('NoNoticesComponent', () => {
  let component: NoNoticesComponent;
  let fixture: ComponentFixture<NoNoticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoNoticesComponent]
});
    fixture = TestBed.createComponent(NoNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
