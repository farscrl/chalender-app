import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNoticesComponent } from './my-notices.component';

describe('MyNoticesComponent', () => {
  let component: MyNoticesComponent;
  let fixture: ComponentFixture<MyNoticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MyNoticesComponent]
});
    fixture = TestBed.createComponent(MyNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
