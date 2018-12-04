import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  HostBinding
} from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';

import {
  NestedListService,
  NestedListItemData,
  NestedListSubListData,
  NestedListData,
  NestedListItemClick,
  NestedListItemSelect,
  NestedListMixData,
  NestedListSubListId
} from './nested-list.service';

@Component({
  selector: 'bc-nested-list',
  templateUrl: 'nested-list.component.html',
  styleUrls: ['nested-list.component.scss'],
  providers: [NestedListService],
  exportAs: 'bcNestedList',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedListComponent {
  @HostBinding('class') readonly className = 'bc-nested-list';

  @Input() dataSource!: NestedListData;

  @Input()
  set openSubs(ids: NestedListSubListId[]) {
    this.nestedListService.setOpenSubs(ids);
  }
  get openSubs() {
    return this.nestedListService.openSubs;
  }

  @Input() selectedItem!: NestedListItemData['id'];

  @Input() autoOpen = false;

  @Output() itemClick = new EventEmitter<NestedListItemClick>();

  @Output() itemSelect = new EventEmitter<NestedListItemSelect>();

  private afterNgInit = false;

  constructor(private nestedListService: NestedListService, private cdf: ChangeDetectorRef) {}

  isItem(data: NestedListItemData | NestedListSubListData) {
    return this.nestedListService.isItem(data);
  }

  isSubList(data: NestedListItemData | NestedListSubListData) {
    return this.nestedListService.isSubList(data);
  }

  _reportItemClick(data: NestedListItemData | NestedListItemClick) {
    this.itemClick.emit(this.createReportData(data));
  }

  _reportItemSelect(data: NestedListItemData | NestedListItemClick) {
    const newData = this.createReportData(data);
    this.itemSelect.emit(newData);
    if (this.autoOpen && !this.afterNgInit) {
      setTimeout(() => {
        this.afterNgInit = true;
        this.openSubs = [...this.openSubs, ...newData.idPath.slice(1)];
        this.cdf.markForCheck();
      });
    }
  }

  private createReportData(data: NestedListItemData | NestedListItemClick) {
    if (this.isItem(data as NestedListItemData)) {
      return { item: data as NestedListItemData, id: data.id, idPath: [data.id] };
    } else {
      return data as NestedListItemClick;
    }
  }
}

@Component({
  selector: 'bc-nested-sub-list',
  templateUrl: 'nested-sub-list.component.html'
})
export class NestedSubListComponent {
  @HostBinding('class') readonly className = 'bc-nested-sub-list';

  @Input() dataSource!: NestedListSubListData;
  @Input() selectedItem!: NestedListItemData['id'];
  @Output() itemClick = new EventEmitter<NestedListItemClick>();
  @Output() itemSelect = new EventEmitter<NestedListItemSelect>();

  constructor(private nestedListService: NestedListService) {}

  isItem(data: NestedListMixData) {
    return this.nestedListService.isItem(data);
  }

  isSubList(data: NestedListMixData) {
    return this.nestedListService.isSubList(data);
  }

  isOpen(id: NestedListSubListData['title']['id']) {
    return this.nestedListService.hasSubs(id);
  }

  _reportItemClick(data: NestedListItemData | NestedListItemClick) {
    this.itemClick.emit(this.createReportData(data));
  }

  _reportItemSelect(data: NestedListItemData | NestedListItemClick) {
    this.itemSelect.emit(this.createReportData(data));
  }

  private createReportData(data: NestedListItemData | NestedListItemClick) {
    if (this.isItem(data as NestedListItemData)) {
      return {
        item: data as NestedListItemData,
        id: data.id,
        idPath: [data.id, this.dataSource.title.id]
      };
    } else {
      return {
        ...(data as NestedListItemClick),
        idPath: [...(data as NestedListItemClick).idPath, this.dataSource.title.id]
      };
    }
  }
}

@Component({
  selector: 'bc-nested-list-item',
  template: `
    <mat-list-item (click)="_reportClick()">
      <mat-icon matListIcon *ngIf="dataSource.icon">{{ dataSource.icon }}</mat-icon>
      <span mat-line>{{ dataSource.label }}</span>
    </mat-list-item>
  `
})
export class NestedListItemComponent implements OnChanges {
  @Input() dataSource!: NestedListItemData;
  @Input() isSelect!: boolean;
  @Output() itemClick = new EventEmitter<NestedListItemClick>();
  @Output() itemSelect = new EventEmitter<NestedListItemSelect>();

  @HostBinding('class') readonly className = 'bc-nested-list-item';
  @HostBinding('class.active')
  get classActiveName() {
    return this.isSelect;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.isSelect &&
      changes.isSelect.currentValue &&
      changes.isSelect.previousValue !== changes.isSelect.currentValue
    ) {
      this._reportSelect();
    }
  }

  _reportClick() {
    this.itemClick.emit(this.createReportData());
  }

  _reportSelect() {
    this.itemSelect.emit(this.createReportData());
  }

  private createReportData() {
    return {
      item: this.dataSource,
      id: this.dataSource.id,
      idPath: [this.dataSource.id]
    };
  }
}

@Component({
  selector: 'bc-nested-list-collapse',
  template: `
    <div [@collapse]="isOpen ? 'open' : 'closed'" class="bc-nested-list-collapse-wrap"><ng-content></ng-content></div>
  `,
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }
    `
  ],
  animations: [
    trigger('collapse', [
      state(
        'open',
        style({
          height: '*'
        })
      ),
      state(
        'closed',
        style({
          height: 0
        })
      ),
      transition('open<=>closed', [animate(200)])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedListCollapseComponent {
  @Input() isOpen = false;

  @HostBinding('class') readonly className = 'bc-nested-list-collapse';
  @HostBinding('class.open')
  get classOpenName() {
    return this.isOpen;
  }

  constructor(private nestedListService: NestedListService) {}

  toggle(id: NestedListSubListData['title']['id']) {
    this.isOpen = !this.isOpen;
    this.nestedListService.toggleSubList(id);
  }
}
