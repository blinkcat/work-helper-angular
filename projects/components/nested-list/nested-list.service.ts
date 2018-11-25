import { Injectable } from '@angular/core';

@Injectable()
export class NestedListService {
  get openSubs() {
    return Array.from(this._openSubs);
  }
  private _openSubs = new Set<NestedListSubListId>();

  constructor() {}

  setOpenSubs(ids: NestedListSubListId[] = []) {
    this._openSubs = new Set(ids);
  }

  hasSubs(id: NestedListSubListId) {
    return this._openSubs.has(id);
  }

  toggleSubList(id: NestedListSubListId) {
    if (this._openSubs.has(id)) {
      this._openSubs.delete(id);
    } else {
      this._openSubs.add(id);
    }
  }

  isItem(data: NestedListMixData) {
    return this.isNestedListItemData(data);
  }

  isSubList(data: NestedListMixData) {
    return this.isNestedListSubListData(data);
  }

  private isNestedListItemData(data: NestedListMixData | NestedListItemClick): data is NestedListItemData {
    return (data as NestedListItemData).label != null;
  }

  private isNestedListSubListData(data: NestedListMixData): data is NestedListSubListData {
    return (data as NestedListSubListData).title != null;
  }
}

export interface NestedListItemData {
  label: string | number;
  id: string;
  icon?: string;
  extras?: any;
}

export interface NestedListSubListData {
  title: NestedListItemData;
  children: NestedListMixData[];
}

export type NestedListMixData = NestedListItemData | NestedListSubListData;

export type NestedListData = NestedListMixData[];

export interface NestedListItemClick {
  item: NestedListItemData;
  id: NestedListItemData['id'];
  idPath: Array<NestedListItemData['id']>;
}

export type NestedListSubListId = NestedListSubListData['title']['id'];

export type NestedListItemSelect = NestedListItemClick;
