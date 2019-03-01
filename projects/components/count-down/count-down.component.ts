import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'bc-count-down',
  template: `
    {{ timer$ | async }}
  `,
  host: {
    class: 'bc-count-down'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountDownComponent {
  @Input()
  set target(date: Date) {
    if (!(date instanceof Date)) {
      throw Error(`count down target must be Date type. now is: ${date}, type is: ${typeof date}`);
    }

    const seconds = Math.max(Math.floor((date.getTime() - Date.now()) / 1000), 0);
    let currentSeconds = seconds;

    this.timer$ = timer(0, 1000).pipe(
      take(seconds + 1),
      tap(s => {
        if (s === 0) {
          this.toggleCountingStatus();
        }
      }),
      map(s => {
        currentSeconds = seconds - s;

        // 是否需要发送process事件
        if (this.emitProcessEvent) {
          this.process.emit(currentSeconds);
        }

        this._currentTimeStr = this.format(currentSeconds);

        return this._currentTimeStr;
      }),
      finalize(() => {
        this.toggleCountingStatus();
        this.stop.emit(currentSeconds);
      })
    );
  }

  @Input() format: (seconds: number) => string = this.defaultFormat;
  @Input() emitProcessEvent = false;

  @Output() process = new EventEmitter<number>();
  @Output() stop = new EventEmitter<number>();

  timer$!: Observable<string>;

  /**
   * 是否正在倒计时
   *
   * @readonly
   * @memberof CountDownComponent
   */
  get counting() {
    return this._counting;
  }

  get currentTimeStr() {
    return this._currentTimeStr;
  }

  private _currentTimeStr = '';

  private _counting = false;

  private toggleCountingStatus() {
    // in case of ExpressionChangedAfterItHasBeenCheckedError
    Promise.resolve().then(() => {
      this._counting = !this._counting;
    });
  }

  private defaultFormat(seconds: number) {
    const hours = 60 * 60;
    const minutes = 60;

    const h = Math.floor(seconds / hours);
    const m = Math.floor((seconds - h * hours) / minutes);
    const s = seconds - h * hours - m * minutes;

    return `${this.fixedZero(h)}:${this.fixedZero(m)}:${this.fixedZero(s)}`;
  }

  private fixedZero(val: number) {
    return val < 10 ? `0${val}` : `${val}`;
  }
}
