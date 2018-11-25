import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'bc-count-down',
  template: `
    {{ _timer$ | async }}
  `,
  host: {
    class: 'bc-count-down'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountDownComponent {
  @Input()
  set seconds(d: Date) {
    if (d == null) {
      d = new Date();
    }
    this._seconds = d;
    const s = Math.max(Math.floor((d.getTime() - Date.now()) / 1000), 0);
    let latestNum = s;
    this._timer$ = timer(0, 1000).pipe(
      take(s + 1),
      tap(v => {
        if (v === 0) {
          this.toggleCounting();
        }
      }),
      map(v => {
        latestNum = s - v;
        if (this.emitProcessEvent) {
          this.process.emit(latestNum);
        }
        return this.format(latestNum);
      }),
      finalize(() => {
        this.toggleCounting();
        this.stop.emit(latestNum);
      })
    );
  }
  get seconds() {
    return this._seconds;
  }

  @Input() format: (seconds: number) => string = this.defaultFormat;
  @Input() emitProcessEvent = false;

  @Output() process = new EventEmitter<number>();
  @Output() stop = new EventEmitter<number>();

  _timer$: Observable<string>;

  get counting() {
    return this._counting;
  }

  private _seconds: Date;
  private _counting = false;

  private toggleCounting() {
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
