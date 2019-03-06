import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CountDownComponent } from './count-down.component';

describe('CountDownComponent', () => {
  let fixture: ComponentFixture<CountDownComponent>;
  let component: CountDownComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountDownComponent]
    });

    fixture = TestBed.createComponent(CountDownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it(`should have class 'bc-count-down'`, () => {
    const countDownEl: HTMLElement = fixture.nativeElement;

    expect(countDownEl.classList.contains('bc-count-down')).toBeTruthy();
  });

  it('counting prop should be false in the beginning', () => {
    expect(component.counting).toBe(false);
  });

  it(`currentTime prop should be '' in the beginning`, () => {
    expect(component.currentTimeStr).toBe('');
  });

  it('should do nothing if the type of target prop is not Date', fakeAsync(() => {
    component.target = (null as any) as Date;

    fixture.detectChanges();

    expect(component.counting).toBe(false);

    tick();

    fixture.detectChanges();

    expect(component.counting).toBe(false);
  }));

  it('should start counting down and showing the string of current time after call tick', fakeAsync(() => {
    // 10s
    const millis = 10 * 1000;
    const target = new Date(Date.now() + millis);

    component.target = target;

    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    expect(component.currentTimeStr).toBe('00:00:10');
    expect(fixture.nativeElement.textContent).toContain('00:00:10');
    expect(component.counting).toBe(true);

    tick(millis / 2);

    fixture.detectChanges();

    expect(component.currentTimeStr).toBe('00:00:05');
    expect(fixture.nativeElement.textContent).toContain('00:00:05');

    tick(millis / 2);

    fixture.detectChanges();

    expect(component.currentTimeStr).toBe('00:00:00');
    expect(fixture.nativeElement.textContent).toContain('00:00:00');
    expect(component.counting).toBe(false);
  }));

  it('should accept custom format function and work fine', fakeAsync(() => {
    const millis = 60 * 1000;
    component.format = format;
    component.target = new Date(Date.now() + 60 * 1000);

    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    expect(component.counting).toBe(true);
    expect(component.currentTimeStr).toBe('60s后重发');
    expect(component.currentSeconds).toBe(60);
    expect(fixture.nativeElement.textContent).toContain('60s后重发');

    tick(millis / 2);

    fixture.detectChanges();

    expect(component.currentTimeStr).toBe('30s后重发');
    expect(component.currentSeconds).toBe(30);
    expect(fixture.nativeElement.textContent).toContain('30s后重发');

    tick(millis / 2);

    fixture.detectChanges();

    expect(component.counting).toBe(false);
    expect(component.currentTimeStr).toBe('');
    expect(component.currentSeconds).toBe(0);
    expect(fixture.nativeElement.textContent.trim()).toBe('');
  }));

  it('should raise stop event when time is over', fakeAsync(() => {
    const millis = 1000;
    let seconds = -1;

    component.target = new Date(Date.now() + millis);
    component.stop.subscribe((s: number) => (seconds = s));

    fixture.detectChanges();

    tick(millis);

    fixture.detectChanges();

    expect(seconds).toBe(0);
  }));

  it('should raise process event when emitProcessEvent is true', fakeAsync(() => {
    const millis = 10 * 1000;
    let seconds = -1;

    component.target = new Date(Date.now() + millis);
    component.emitProcessEvent = true;
    component.process.subscribe((s: number) => (seconds = s));

    fixture.detectChanges();

    tick(1000);

    fixture.detectChanges();

    expect(component.counting).toBe(true);
    expect(seconds).toBe(9);

    tick(1000);

    fixture.detectChanges();

    expect(seconds).toBe(8);

    tick(8 * 1000);

    fixture.detectChanges();

    expect(seconds).toBe(0);
    expect(component.counting).toBe(false);
  }));
});

function format(seconds: number) {
  if (seconds) {
    const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${s}s后重发`;
  } else {
    return '';
  }
}
