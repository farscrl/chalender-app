import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeCodeGeneratorComponent } from './iframe-code-generator.component';

describe('IframeCodeGeneratorComponent', () => {
  let component: IframeCodeGeneratorComponent;
  let fixture: ComponentFixture<IframeCodeGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IframeCodeGeneratorComponent]
    });
    fixture = TestBed.createComponent(IframeCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
