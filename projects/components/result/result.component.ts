import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'bc-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  /* tslint:disable: use-host-property-decorator */
  host: {
    class: 'bc-result'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent {
  @Input()
  get icon() {
    return this._icon;
  }
  set icon(val: StringOrTemplate) {
    this._icon = val;
    if (this.isTemplate(val)) {
      this._iconIsString = false;
    } else {
      this._iconIsString = true;
    }
  }

  _iconIsString = false;

  @Input()
  get title() {
    return this._title;
  }
  set title(val: StringOrTemplate) {
    this._title = val;
    if (this.isTemplate(val)) {
      this._titleIsString = false;
    } else {
      this._titleIsString = true;
    }
  }

  _titleIsString = false;

  @Input()
  get description() {
    return this._description;
  }
  set description(val: StringOrTemplate) {
    this._description = val;
    if (this.isTemplate(val)) {
      this._descriptionIsString = false;
    } else {
      this._descriptionIsString = true;
    }
  }

  _descriptionIsString = false;

  @Input()
  get extras() {
    return this._extras;
  }
  set extras(val: StringOrTemplate) {
    this._extras = val;
    if (this.isTemplate(val)) {
      this._extrasIsString = false;
    } else {
      this._extrasIsString = true;
    }
  }

  _extrasIsString = false;

  @Input() buttonText!: string;
  @Input() buttonColor!: 'primary' | 'accent' | 'warn';
  @Input() buttonDisabled = false;

  @Output() buttonClick = new EventEmitter();

  private _icon!: StringOrTemplate;
  private _title!: StringOrTemplate;
  private _description!: StringOrTemplate;
  private _extras!: StringOrTemplate;

  handleClick() {
    this.buttonClick.emit();
  }

  private isTemplate(prop: any) {
    return prop instanceof TemplateRef;
  }
}

type StringOrTemplate = string | TemplateRef<any>;
