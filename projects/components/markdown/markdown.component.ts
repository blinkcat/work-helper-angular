import { Component, ViewEncapsulation, ElementRef, Renderer2, AfterContentInit, HostBinding } from '@angular/core';

@Component({
  selector: 'bc-markdown',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      .bc-markdown {
        display: block;
        padding: 10px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownComponent {
  @HostBinding('class') readonly className = 'bc-markdown';
}

@Component({
  selector: 'bc-markdown-comp',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      .bc-markdown-comp {
        position: relative;
        box-sizing: border-box;
        margin: 16px 0px;
        padding: 50px 35px;
        border: 1px dashed rgb(229, 229, 229);
        background-color: rgb(255, 255, 255);
        transition: background-color 0.2s ease 0s;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownCComponent implements AfterContentInit {
  @HostBinding('class') readonly className = 'bc-markdown-comp';

  constructor(private ele: ElementRef, private render: Renderer2) {}

  ngAfterContentInit() {
    this.checkContent(this.ele);
  }

  private checkContent(ele: ElementRef) {
    if (ele.nativeElement.childNodes.length === 0) {
      this.render.setStyle(ele.nativeElement, 'display', 'none');
    } else {
      this.render.setStyle(ele.nativeElement, 'display', 'block');
    }
  }
}

@Component({
  selector: 'bc-markdown-md',
  template: `
    <markdown ngPreserveWhitespaces class="markdown-body"> <ng-content></ng-content> </markdown>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MarkdownMComponent {
  @HostBinding('class') readonly className = 'bc-markdown-md';
}
