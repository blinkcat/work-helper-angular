import {
  Component,
  Directive,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'bc-markdown-man',
  template: `
    <div class="bc-markdown-man-component-container" #top><ng-content select="[bcMarkdownManTop]"></ng-content></div>
    <markdown ngPreserveWhitespaces class="markdown-body"> <ng-content></ng-content> </markdown>
    <div class="bc-markdown-man-component-container" #bottom>
      <ng-content select="[bcMarkdownManBottom]"></ng-content>
    </div>
  `,
  styles: [
    `
      .bc-markdown-man {
        display: block;
        padding: 10px;
      }

      .bc-markdown-man-component-container {
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
    class: 'bc-markdown-man'
  },
  encapsulation: ViewEncapsulation.None
})
export class MarkdownManComponent implements AfterViewInit {
  @ViewChild('top') top: ElementRef<any>;
  @ViewChild('bottom') bottom: ElementRef<any>;

  constructor(private render: Renderer2) {}

  ngAfterViewInit() {
    this.checkContent(this.top);
    this.checkContent(this.bottom);
  }

  private checkContent(ele: ElementRef) {
    if (ele.nativeElement.childNodes.length === 0) {
      this.render.setStyle(ele.nativeElement, 'display', 'none');
    } else {
      this.render.setStyle(ele.nativeElement, 'display', 'block');
    }
  }
}

@Directive({ selector: '[bcMarkdownManTop]' })
export class MarkdownManTopDirective {
  constructor() {}
}

@Directive({ selector: '[bcMarkdownManBottom]' })
export class MarkdownManBottomDirective {
  constructor() {}
}
