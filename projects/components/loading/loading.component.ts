import {
  Component,
  Input,
  ViewEncapsulation,
  TemplateRef,
  ElementRef,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
  Renderer2,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'bc-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'bcLoading',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnChanges, AfterViewInit, OnDestroy {
  @HostBinding('class') readonly className = 'bc-loading';

  @Input() isLoading = false;
  @Input() tip: string;
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() delay = 0;
  @Input() indicator: TemplateRef<any>;

  get diameter() {
    switch (this.size) {
      case 'small':
        return 14;
      case 'large':
        return 35;
      default:
        return 25;
    }
  }

  @ViewChild('content') content: ElementRef<any>;
  @ViewChild('area') area: ElementRef<any>;

  timer: any = null;

  constructor(private cdf: ChangeDetectorRef, private render: Renderer2, private ele: ElementRef<any>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.delay > 0 && changes.isLoading) {
      const change = changes.isLoading;
      if (!change.previousValue && change.currentValue === true) {
        this.clearTimer();
        this.isLoading = false;
        this.timer = setTimeout(() => {
          this.isLoading = true;
          this.cdf.detectChanges();
        }, this.delay);
      } else if (!change.currentValue) {
        this.clearTimer();
      }
    }
  }

  ngAfterViewInit() {
    this.checkContent();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  checkContent() {
    const ele = this.ele.nativeElement;
    const content = this.content.nativeElement;
    const area = this.area.nativeElement;

    if (this.isEmpty(this.content)) {
      this.render.removeStyle(ele, 'display');
      this.render.removeClass(content, 'bc-loading-content');
      this.render.removeClass(area, 'bc-loading-area');
    } else {
      this.render.setStyle(ele, 'display', 'block');
      this.render.addClass(content, 'bc-loading-content');
      this.render.addClass(area, 'bc-loading-area');
    }
  }

  private isEmpty(ele: ElementRef<any>) {
    return ele.nativeElement.childNodes.length === 0;
  }
}
