import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'bc-count-down',
  template: `
    {{ _timer$ | async }}
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountDownComponent {
  @HostBinding('class') readonly className = 'bc-count-down';

  @Input()
  set target(date: Date) {
    if (!(date instanceof Date)) {
      // date = new Date();
      return;
    }

    this._target = date;

    const seconds = Math.max(Math.floor((date.getTime() - Date.now()) / 1000), 0);
    let currentSeconds = seconds;

    this._timer$ = timer(0, 1000).pipe(
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

        return this.format(currentSeconds);
      }),
      finalize(() => {
        this.toggleCountingStatus();
        this.stop.emit(currentSeconds);
      })
    );
  }
  get target() {
    return this._target;
  }

  @Input() format: (seconds: number) => string = this.defaultFormat;
  @Input() emitProcessEvent = false;

  @Output() process = new EventEmitter<number>();
  @Output() stop = new EventEmitter<number>();

  _timer$: Observable<string>;

  get counting() {
    return this._counting;
  }

  private _target: Date;
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
