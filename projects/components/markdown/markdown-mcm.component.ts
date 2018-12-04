import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'bc-markdown-mcm',
  template: `
    <bc-markdown>
      <bc-markdown-md>{{ mdTop }}</bc-markdown-md>
      <bc-markdown-comp><ng-content></ng-content></bc-markdown-comp>
      <bc-markdown-md>{{ mdBottom }}</bc-markdown-md>
    </bc-markdown>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownMcmComponent {
  @HostBinding('class') readonly className = 'bc-markdown-mcm';

  @Input() mdTop!: string;
  @Input() mdBottom!: string;
}
