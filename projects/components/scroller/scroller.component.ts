import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  Input,
  Output,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  NgZone,
  Renderer2,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Scroller } from './scroller';
import { AnyFunction } from './type';

@Component({
  selector: 'bc-scroller',
  template: `
    <div class="bc-scroller-content" #content><ng-content></ng-content></div>
  `,
  styles: [
    `
      .bc-scroller {
        display: block;
        overflow: hidden;
      }

      .bc-scroller-content {
        display: inline-block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ScrollerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @HostBinding('class') readonly className = 'bc-scroller';

  @ViewChild('content') content!: ElementRef<HTMLElement>;

  @Input() bouncing = true;
  @Input() snapping = false;
  @Input() animating = true;
  @Input() scrollingX = true;
  @Input() scrollingY = true;
  @Input() animationDuration = 250;
  @Input() snapWidth = 1;
  @Input() snapHeight = 1;
  @Output() complete = new EventEmitter();
  // @Output() move = new EventEmitter<ScrollerMove>();

  touchstart$!: Observable<MixEvent>;
  touchmove$!: Observable<MixEvent>;
  touchend$!: Observable<MixEvent>;
  resize$!: Observable<Event>;
  destory$ = new Subject<boolean>();

  private scroller!: Scroller | null;

  constructor(private container: ElementRef<HTMLElement>, private ngzone: NgZone, private render: Renderer2) {}

  ngOnInit() {
    this.scroller = new Scroller({
      scrollingX: this.scrollingX,
      scrollingY: this.scrollingY,
      animating: this.animating,
      animationDuration: this.animationDuration,
      bouncing: this.bouncing,
      snapping: this.snapping
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scroller) {
      ['snapWidth', 'snapHeight'].forEach(value => {
        if (value in changes) {
          this.setSnapSize();
        }
      });

      ['bouncing', 'snapping', 'animating', 'scrollingX', 'scrollingY', 'animationDuration'].forEach(value => {
        if (value in changes) {
          this.scroller!.setOptions({ [value]: changes[value].currentValue });
        }
      });
    }
  }

  ngAfterViewInit() {
    this.setDimensions();

    this.setSnapSize();

    this.subscribeAll();
  }

  ngOnDestroy() {
    this.unSubscribeAll();
    this.scroller = null;
  }

  getPosition() {
    if (this.scroller) {
      return this.scroller.getPosition();
    }
  }

  scrollTop(scrollX: number, scrollY: number, animating = false) {
    if (this.scroller) {
      this.scroller.scrollTo(screenX, scrollY, animating);
    }
  }

  private scroll(scrollX: number, scrollY: number) {
    this.render.setStyle(this.content.nativeElement, '-webkit-transform', `translate3d(${scrollX}px, ${scrollY}px, 0)`);
    this.render.setStyle(this.content.nativeElement, 'transform', `translate3d(${scrollX}px, ${scrollY}px, 0)`);
  }

  private subscribeAll() {
    this.runOutsideAngular(this.bindEvents);
    this.scroller!.move.pipe(takeUntil(this.destory$)).subscribe(move => {
      this.scroll(move.scrollX, move.scrollY);
      // this.move.emit(move);
    });
    this.scroller!.complete.pipe(takeUntil(this.destory$)).subscribe(() => {
      this.runInAngular(() => {
        this.complete.emit();
      });
    });
  }

  private unSubscribeAll() {
    this.destory$.next(true);
  }

  private runOutsideAngular(fn: AnyFunction) {
    this.ngzone.runOutsideAngular(fn);
  }

  private runInAngular(fn: AnyFunction) {
    this.ngzone.run(fn);
  }

  private bindEvents = () => {
    const isTouchDevice = 'ontouchstart' in window;

    this.touchstart$ = fromEvent<MixEvent>(this.content.nativeElement, isTouchDevice ? 'touchstart' : 'mousedown');

    this.touchstart$.pipe(takeUntil(this.destory$)).subscribe((event: MixEvent) => {
      event.preventDefault();
      if (isTouchDevice) {
        this.scroller!.handleTouchStart((event as TouchEvent).touches, event.timeStamp);
      } else {
        this.scroller!.handleTouchStart(this.getTouchesFromMouseEvent(event as MouseEvent), event.timeStamp);
      }
    });

    this.touchmove$ = fromEvent<MixEvent>(document, isTouchDevice ? 'touchmove' : 'mousemove', { passive: false });

    this.touchmove$.pipe(takeUntil(this.destory$)).subscribe((event: MixEvent) => {
      event.preventDefault();
      if (isTouchDevice) {
        this.scroller!.handleTouchMove((event as TouchEvent).touches, event.timeStamp);
      } else {
        this.scroller!.handleTouchMove(this.getTouchesFromMouseEvent(event as MouseEvent), event.timeStamp);
      }
    });

    this.touchend$ = fromEvent<MixEvent>(document, isTouchDevice ? 'touchend' : 'mouseup');

    this.touchend$.pipe(takeUntil(this.destory$)).subscribe((event: MixEvent) => {
      event.preventDefault();
      this.scroller!.handleTouchEnd(event.timeStamp);
    });

    this.resize$ = fromEvent<Event>(window, 'resize');

    this.resize$.pipe(takeUntil(this.destory$)).subscribe(() => {
      this.setDimensions();
    });
  };

  private getTouchesFromMouseEvent(event: MouseEvent) {
    return ([{ pageX: event.pageX, pageY: event.pageY }] as any) as TouchEvent['touches'];
  }

  private setDimensions() {
    const container = this.container.nativeElement;
    const content = this.content.nativeElement;
    this.scroller!.setDimensions(
      container.clientWidth,
      container.clientHeight,
      content.offsetWidth,
      content.offsetHeight
    );
  }

  private setSnapSize() {
    if (this.snapping) {
      this.scroller!.setSnapSize(this.snapWidth, this.snapHeight);
    }
  }
}

type MixEvent = MouseEvent | TouchEvent;
