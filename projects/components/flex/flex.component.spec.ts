import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  FlexComponent,
  FlexItemDirective,
  BcFlexDirection,
  BcFlexJustify,
  BcFlexAlign,
  BcFlexWrap,
  BcFlexAlignContent
} from './flex.component';

@Component({
  selector: 'test-dummy',
  template: `
    <bc-flex>
      <div bcFlexItem>1</div>
      <bc-flex bc-flex-item>2</bc-flex>
    </bc-flex>
  `
})
export class DummyComponent {}

describe('FlexComponent', () => {
  let fixture: ComponentFixture<FlexComponent>;
  let component: FlexComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlexComponent, DummyComponent, FlexItemDirective]
    });

    fixture = TestBed.createComponent(FlexComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have class bc-flex', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('bc-flex')).toBe(true);
  });

  it('should wrap some children and children that have class  bc-flex-item', () => {
    const dummyFixture = TestBed.createComponent(DummyComponent);

    dummyFixture.detectChanges();

    expect(dummyFixture.nativeElement.firstChild.children.length).toBe(2);

    const des = dummyFixture.debugElement.queryAll(By.directive(FlexItemDirective));

    expect(des.length).toBe(2);

    expect(des[0].nativeElement.classList.contains('bc-flex-item')).toBe(true);
    expect(des[1].nativeElement.classList.contains('bc-flex-item')).toBe(true);
  });

  checkClass('direction', Object.keys(BcFlexDirection), 'bc-flex-dir');
  checkClass('wrap', Object.keys(BcFlexWrap), 'bc-flex');
  checkClass('justify', Object.keys(BcFlexJustify), 'bc-flex-justify');
  checkClass('align', Object.keys(BcFlexAlign), 'bc-flex-align');
  checkClass('alignContent', Object.keys(BcFlexAlignContent), 'bc-flex-align-content');

  function checkClass(propName: string, arr: any, prefix: string) {
    describe(propName, () => {
      arr.forEach((v: any) => {
        it(`should have class ${prefix}-${v}`, () => {
          (component as any)[propName] = v;

          fixture.detectChanges();

          expect(fixture.nativeElement.classList.contains(`${prefix}-${v}`)).toBe(true);
        });
      });
    });
  }
});
