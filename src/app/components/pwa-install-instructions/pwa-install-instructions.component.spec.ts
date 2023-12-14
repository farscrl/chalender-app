import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaInstallInstructionsComponent } from './pwa-install-instructions.component';

describe('PwaInstallInstructionsComponent', () => {
  let component: PwaInstallInstructionsComponent;
  let fixture: ComponentFixture<PwaInstallInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PwaInstallInstructionsComponent]
    });
    fixture = TestBed.createComponent(PwaInstallInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
