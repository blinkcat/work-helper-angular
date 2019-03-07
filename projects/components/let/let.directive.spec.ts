import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LetDirective } from './let.directive';

const delayTimeShort = 2000;

@Component({
  selector: 'test-dummy',
  template: `
    <ng-container *bcLet="(data$ | async) as d">
      <div class="target">{{ d }}</div>
      <div class="original">still here</div>
    </ng-container>
  `
})
export class DummyComponent {
  data$ = of('test').pipe(delay(delayTimeShort));
}

@Component({
  selector: 'test-dummy-with-dummy',
  template: `
    <ng-container *bcLet="{ d1: data$ | async, d2: data2$ | async } as ds">
      <div class="target">{{ ds.d1 }}</div>
      <div class="target">{{ ds.d2 }}</div>
      <div class="original">still here</div>
    </ng-container>
  `
})
export class DummyWithDummyComponent {
  data$ = of('test').pipe(delay(delayTimeShort));
  data2$ = of(2).pipe(delay(delayTimeShort * 2));
}

describe('LetDirective', () => {
  let fixture: ComponentFixture<DummyComponent>;
  let component: DummyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetDirective, DummyComponent, DummyWithDummyComponent]
    });

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render data correctly', fakeAsync(() => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.original')).nativeElement.textContent).toBe('still here');

    tick(delayTimeShort);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.original')).nativeElement.textContent).toBe('still here');
    expect(fixture.debugElement.query(By.css('.target')).nativeElement.textContent).toBe('test');
  }));

  it('should render data of two observables correctly', fakeAsync(() => {
    const fixture2 = TestBed.createComponent(DummyWithDummyComponent);

    fixture2.detectChanges();

    expect(fixture2.debugElement.query(By.css('.original')).nativeElement.textContent).toBe('still here');

    tick(delayTimeShort);

    fixture2.detectChanges();

    const targets = fixture2.debugElement.queryAll(By.css('.target'));

    expect(targets.length).toBe(2);
    expect(targets[0].nativeElement.textContent).toBe('test');
    expect(fixture2.debugElement.query(By.css('.original')).nativeElement.textContent).toBe('still here');

    tick(delayTimeShort);

    fixture2.detectChanges();

    expect(fixture2.debugElement.query(By.css('.original')).nativeElement.textContent).toBe('still here');
    expect(targets[1].nativeElement.textContent).toBe('2');
  }));
});
