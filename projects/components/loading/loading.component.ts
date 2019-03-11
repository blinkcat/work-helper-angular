import {
  Component,
  Input,
  ViewEncapsulation,
  TemplateRef,
  ElementRef,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'bc-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.scss'],
  host: {
    class: 'bc-loading'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'bcLoading'
})
export class LoadingComponent implements OnChanges, OnDestroy {
  @Input() isLoading = false;
  @Input() tip!: string;
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() delay = 0;
  @Input() indicator!: TemplateRef<any>;

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

  @ViewChild('content') content!: ElementRef<any>;

  timer: any = null;

  constructor(private cdf: ChangeDetectorRef) {}

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

  ngOnDestroy() {
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
