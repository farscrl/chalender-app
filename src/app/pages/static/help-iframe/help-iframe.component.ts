import { Component } from '@angular/core';
import { IframeCodeGeneratorComponent } from '../../../shared/components/forms/iframe-code-generator/iframe-code-generator.component';

@Component({
    selector: 'app-help-iframe',
    templateUrl: './help-iframe.component.html',
    styleUrls: ['./help-iframe.component.scss'],
    imports: [IframeCodeGeneratorComponent]
})
export class HelpIframeComponent {

}
