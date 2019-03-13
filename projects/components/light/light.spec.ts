import { NgModule, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, inject, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';

import { LightModule } from './light.module';
import { LightService } from './light.service';

describe('BcLight', () => {
  let lightService: LightService;
  let fixture: ComponentFixture<SingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: no-use-before-declare
      imports: [LightModule, LightTestModule, NoopAnimationsModule]
    });

    // tslint:disable-next-line: no-use-before-declare
    fixture = TestBed.createComponent(SingleComponent);
  });

  beforeEach(inject([LightService], (ls: LightService) => {
    lightService = ls;
  }));

  it('should highlight the specified element', fakeAsync(() => {
    const ref = lightService.open(document.getElementById('target')!);

    fixture.detectChanges();

    expect(document.querySelector('.bc-light-container')).toBeTruthy();
    expect(document.querySelector('.bc-light-canvas')).toBeTruthy();

    ref.close();

    flush();
  }));

  it('should show the specified contentText', fakeAsync(() => {
    expect(document.querySelector('.bc-light-tip-content')).toBeFalsy();
    expect(document.querySelector('.bc-light-canvas')).toBeFalsy();

    lightService.open(document.getElementById('target')!, {
      contentText: 'just test contentText'
    });

    fixture.detectChanges();

    expect(document.querySelector('.bc-light-tip-content')).toBeTruthy();
    expect(document.querySelector('.bc-light-canvas')).toBeTruthy();
    expect(document.querySelector('.bc-light-tip-content')!.textContent).toBe('just test contentText');

    lightService.close();

    flush();
  }));

  it('should show multi lights one by one', fakeAsync(() => {
    expect(document.querySelector('.bc-light-tip-content')).toBeFalsy();
    expect(document.querySelector('.bc-light-canvas')).toBeFalsy();

    // tslint:disable-next-line: no-use-before-declare
    const multiFixture = TestBed.createComponent(MultiComponent);

    const ref = lightService.open(document.getElementById('target1')!, {
      contentText: 'this is target 1'
    });

    multiFixture.detectChanges();

    expect(document.querySelector('.bc-light-tip-content')).toBeTruthy();
    expect(document.querySelector('.bc-light-canvas')).toBeTruthy();
    expect(document.querySelector('.bc-light-tip-content')!.textContent).toBe('this is target 1');

    ref.next(document.getElementById('target2')!, {
      contentText: 'this is target 2'
    });

    multiFixture.detectChanges();

    expect(document.querySelector('.bc-light-tip-content')).toBeTruthy();
    expect(document.querySelector('.bc-light-canvas')).toBeTruthy();
    expect(document.querySelector('.bc-light-tip-content')!.textContent).toBe('this is target 2');

    ref.next(document.getElementById('target3')!, {
      contentText: 'this is target 3'
    });

    multiFixture.detectChanges();

    expect(document.querySelector('.bc-light-tip-content')).toBeTruthy();
    expect(document.querySelector('.bc-light-canvas')).toBeTruthy();
    expect(document.querySelector('.bc-light-tip-content')!.textContent).toBe('this is target 3');

    ref.close();

    flush();
  }));

  it('afterOpened, afterClosed and backdropClick should work well', fakeAsync(() => {
    const ref = lightService.open(document.getElementById('target')!);

    fixture.detectChanges();

    const spy = jasmine.createSpyObj('callback', ['afterOpened', 'afterClosed', 'backdropClick']);
    ref.afterOpened().subscribe(spy.afterOpened);
    ref.afterClosed().subscribe(spy.afterClosed);
    ref.backdropClick().subscribe(spy.backdropClick);

    (document.querySelector('.bc-light') as HTMLElement).click();

    ref.close();

    flush();

    expect(spy.afterOpened).toHaveBeenCalled();
    expect(spy.afterClosed).toHaveBeenCalled();
    expect(spy.backdropClick).toHaveBeenCalled();
  }));
});

@Component({
  selector: 'test-single',
  template: `
    <button id="target">test</button>
  `
})
class SingleComponent {}

@Component({
  selector: 'test-multi',
  template: `
    <button id="target1">test1</button> <button id="target2">test2</button> <button id="target3">test3</button>
  `
})
class MultiComponent {}

@NgModule({
  exports: [SingleComponent, MultiComponent],
  declarations: [SingleComponent, MultiComponent]
})
class LightTestModule {}
