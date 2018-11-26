import { Component, ViewEncapsulation, ElementRef, Renderer2, AfterContentInit } from '@angular/core';

@Component({
  selector: 'bc-markdown-man',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      .bc-markdown-man {
        display: block;
        padding: 10px;
      }
    `
  ],
  host: {
    class: 'bc-markdown-man'
  },
  encapsulation: ViewEncapsulation.None
})
export class MarkdownManComponent {}

@Component({
  selector: 'bc-markdown-man-comp',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      .bc-markdown-man-comp {
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
  host: {
    class: 'bc-markdown-man-comp'
  },
  encapsulation: ViewEncapsulation.None
})
export class MarkdownManCComponent implements AfterContentInit {
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
  selector: 'bc-markdown-man-md',
  template: `
    <markdown ngPreserveWhitespaces class="markdown-body"> <ng-content></ng-content> </markdown>
  `,
  host: {
    class: 'bc-markdown-man-md'
  },
  encapsulation: ViewEncapsulation.None
})
export class MarkdownManMComponent {}
