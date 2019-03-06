import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

// #region enum types
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
// #endregion

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
  // #region HostBinding
  @HostBinding('class.bc-flex')
  elFlex = true;

  @HostBinding('class.bc-flex-dir-row')
  get elFlexDirRow() {
    return this._direction === BcFlexDirection.row;
  }

  @HostBinding('class.bc-flex-dir-row-reverse')
  get elFlexDirRowReverse() {
    return this._direction === BcFlexDirection['row-reverse'];
  }

  @HostBinding('class.bc-flex-dir-column')
  get elFlexDirColumm() {
    return this._direction === BcFlexDirection.column;
  }

  @HostBinding('class.bc-flex-dir-column-reverse')
  get elFlexDirColummReverse() {
    return this._direction === BcFlexDirection['column-reverse'];
  }

  @HostBinding('class.bc-flex-wrap')
  get elFlexWrap() {
    return this._wrap === BcFlexWrap.wrap;
  }

  @HostBinding('class.bc-flex-wrap-reverse')
  get elFlexWrapReverse() {
    return this._wrap === BcFlexWrap['wrap-reverse'];
  }

  @HostBinding('class.bc-flex-nowrap')
  get elFlexNowrap() {
    return this._wrap === BcFlexWrap.nowrap;
  }

  @HostBinding('class.bc-flex-justify-start')
  get elFlexJustifyStart() {
    return this._justify === BcFlexJustify.start;
  }

  @HostBinding('class.bc-flex-justify-end')
  get elFlexJustifyEnd() {
    return this._justify === BcFlexJustify.end;
  }

  @HostBinding('class.bc-flex-justify-center')
  get elFlexJustifyCenter() {
    return this._justify === BcFlexJustify.center;
  }

  @HostBinding('class.bc-flex-justify-between')
  get elFlexJustifyBetween() {
    return this._justify === BcFlexJustify.between;
  }

  @HostBinding('class.bc-flex-justify-around')
  get elFlexJustifyAround() {
    return this._justify === BcFlexJustify.around;
  }

  @HostBinding('class.bc-flex-align-start')
  get elFlexAlignStart() {
    return this._align === BcFlexAlign.start;
  }

  @HostBinding('class.bc-flex-align-end')
  get elFlexAlignEnd() {
    return this._align === BcFlexAlign.end;
  }

  @HostBinding('class.bc-flex-align-center')
  get elFlexAlignCenter() {
    return this._align === BcFlexAlign.center;
  }

  @HostBinding('class.bc-flex-align-stretch')
  get elFlexAlignStretch() {
    return this._align === BcFlexAlign.stretch;
  }

  @HostBinding('class.bc-flex-align-baseline')
  get elFlexAlignBaseline() {
    return this._align === BcFlexAlign.baseline;
  }

  @HostBinding('class.bc-flex-align-content-start')
  get elFlexAlignContentStart() {
    return this._alignContent === BcFlexAlignContent.start;
  }

  @HostBinding('class.bc-flex-align-content-end')
  get elFlexAlignContentEnd() {
    return this._alignContent === BcFlexAlignContent.end;
  }

  @HostBinding('class.bc-flex-align-content-center')
  get elFlexAlignContentCenter() {
    return this._alignContent === BcFlexAlignContent.center;
  }

  @HostBinding('class.bc-flex-align-content-stretch')
  get elFlexAlignContentStretch() {
    return this._alignContent === BcFlexAlignContent.stretch;
  }

  @HostBinding('class.bc-flex-align-content-between')
  get elFlexAlignContentBetween() {
    return this._alignContent === BcFlexAlignContent.between;
  }

  @HostBinding('class.bc-flex-align-content-around')
  get elFlexAlignContentAround() {
    return this._alignContent === BcFlexAlignContent.around;
  }
  // #endregion

  @Input()
  set direction(val: BcFlexDirection) {
    this._direction = val;
  }
  @Input()
  set wrap(val: BcFlexWrap) {
    this._wrap = val;
  }
  @Input()
  set justify(val: BcFlexJustify) {
    this._justify = val;
  }
  @Input()
  set align(val: BcFlexAlign) {
    this._align = val;
  }
  @Input()
  set alignContent(val: BcFlexAlignContent) {
    this._alignContent = val;
  }

  private _direction!: BcFlexDirection;
  private _wrap!: BcFlexWrap;
  private _justify!: BcFlexJustify;
  private _align!: BcFlexAlign;
  private _alignContent!: BcFlexAlignContent;
}

@Directive({
  selector: '[bcFlexItem],[bc-flex-item]',
  exportAs: 'bcFlexItem'
})
export class FlexItemDirective {
  @HostBinding('class.bc-flex-item') item = true;
}
