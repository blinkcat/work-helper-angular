import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './loading.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-dummy',
  template: `
    <bc-loading [isLoading]="isLoading" [delay]="delay" [tip]="tip">
      <p class="comp">i need loading status</p>
    </bc-loading>
  `
})
export class DummyComponent {
  @Input() isLoading = false;
  @Input() delay = 0;
  @Input() tip = '';
}

describe('LoadingComponent', () => {
  let fixture: ComponentFixture<DummyComponent>;
  let component: DummyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [LoadingComponent, DummyComponent]
    });

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render component correctly', () => {
    const ele = fixture.debugElement.query(By.css('.comp')).nativeElement;

    expect(ele.textContent).toBe('i need loading status');

    expect(getComputedStyle(ele).display).toBe('block');
  });

  it('should start showing loading', () => {
    component.isLoading = true;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.bc-loading-indicator')).nativeElement).toBeDefined();

    component.isLoading = false;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.bc-loading-indicator'))).toBeNull();
  });

  it('should start showing loading with a tip after delay time and disappear instantly', fakeAsync(() => {
    component.delay = 3000;
    component.isLoading = true;
    component.tip = 'test';

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.bc-loading-indicator'))).toBeNull();

    tick(3000);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.bc-loading-indicator')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('.bc-loading-tip')).nativeElement.textContent).toBe('test');

    component.isLoading = false;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.bc-loading-indicator'))).toBeNull();
  }));
});
