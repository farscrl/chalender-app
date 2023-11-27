import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetiquetteComponent } from './netiquette.component';

describe('NetiquetteComponent', () => {
  let component: NetiquetteComponent;
  let fixture: ComponentFixture<NetiquetteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetiquetteComponent]
    });
    fixture = TestBed.createComponent(NetiquetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
