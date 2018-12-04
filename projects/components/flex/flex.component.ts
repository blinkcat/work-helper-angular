import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'bc-flex',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['flex.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexComponent {
  readonly clsPfx = 'bc-flex';

  @HostBinding('class')
  get bcFlexClass() {
    const clsPfx = this.clsPfx;
    return this.classNames({
      [`${clsPfx}`]: true,

      [`${clsPfx}-dir-row`]: this.direction === BcFlexDirection.row,
      [`${clsPfx}-dir-row-reverse`]: this.direction === BcFlexDirection['row-reverse'],
      [`${clsPfx}-dir-columm`]: this.direction === BcFlexDirection.column,
      [`${clsPfx}-dir-columm-reverse`]: this.direction === BcFlexDirection['column-reverse'],

      [`${clsPfx}-wrap`]: this.wrap === BcFlexWrap.wrap,
      [`${clsPfx}-wrap-reverse`]: this.wrap === BcFlexWrap['wrap-reverse'],
      [`${clsPfx}-nowrap`]: this.wrap === BcFlexWrap.nowrap,

      [`${clsPfx}-justify-start`]: this.justify === BcFlexJustify.start,
      [`${clsPfx}-justify-end`]: this.justify === BcFlexJustify.end,
      [`${clsPfx}-justify-center`]: this.justify === BcFlexJustify.center,
      [`${clsPfx}-justify-between`]: this.justify === BcFlexJustify.between,
      [`${clsPfx}-justify-around`]: this.justify === BcFlexJustify.around,

      [`${clsPfx}-align-start`]: this.align === BcFlexAlign.start,
      [`${clsPfx}-align-end`]: this.align === BcFlexAlign.end,
      [`${clsPfx}-align-center`]: this.align === BcFlexAlign.center,
      [`${clsPfx}-align-stretch`]: this.align === BcFlexAlign.stretch,
      [`${clsPfx}-align-baseline`]: this.align === BcFlexAlign.baseline,

      [`${clsPfx}-align-content-start`]: this.alignContent === BcFlexAlignContent.start,
      [`${clsPfx}-align-content-end`]: this.alignContent === BcFlexAlignContent.end,
      [`${clsPfx}-align-content-center`]: this.alignContent === BcFlexAlignContent.center,
      [`${clsPfx}-align-content-stretch`]: this.alignContent === BcFlexAlignContent.stretch,
      [`${clsPfx}-align-content-between`]: this.alignContent === BcFlexAlignContent.between,
      [`${clsPfx}-align-content-around`]: this.alignContent === BcFlexAlignContent.around
    });
  }

  @Input() direction!: BcFlexDirection;
  @Input() wrap!: BcFlexWrap;
  @Input() justify!: BcFlexJustify;
  @Input() align!: BcFlexAlign;
  @Input() alignContent!: BcFlexAlignContent;

  private classNames(classObj: { [id: string]: boolean | undefined | null }): string {
    if (classObj == null) {
      return '';
    }
    const classes = [];
    for (const key in classObj) {
      if (classObj.hasOwnProperty(key) && classObj[key]) {
        classes.push(key);
      }
    }

    return classes.join(' ');
  }
}

export enum BcFlexDirection {
  row = 'row',
  'row-reverse' = 'row-reverse',
  column = 'column',
  'column-reverse' = 'column-reverse'
}

export enum BcFlexWrap {
  wrap = 'wrap',
  'wrap-reverse' = 'wrap-reverse',
  nowrap = 'nowrap'
}

export enum BcFlexJustify {
  start = 'start',
  end = 'end',
  center = 'center',
  between = 'between',
  around = 'around'
}

export enum BcFlexAlign {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  baseline = 'baseline'
}

export enum BcFlexAlignContent {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  between = 'between',
  around = 'around'
}

@Directive({ selector: '[bcFlexItem],[bc-flex-item]', exportAs: 'bcFlexItem' })
export class FlexItemDirective {
  @HostBinding('class') readonly className = 'bc-flex-item';
}
