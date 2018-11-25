# nested-list

## Directives

### NestedList

## Selector: bc-nested-list

properties

| Name                                                     | Description                                  |
| :------------------------------------------------------- | :------------------------------------------- |
| @Input() dataSource: NestedListData                      | 需要的数据                                   |
| @Input() openSubs： NestedListSubListId[]                | 默认需要展开的子列表                         |
| @Input() selectedItem: NestedListItemData['id']          |  选中的列表项                                |
| @Input() autoOpen: boolean                               | 是否自动展开包含选中项目的子列表，默认 false |
| @Output() itemClick: EventEmitter<NestedListItemClick>   | 列表项点击事件                               |
| @Output() itemSelect: EventEmitter<NestedListItemSelect> | 列表项选中事件                               |

### Interface

NestedListItemData

| Name                    | Description                                                            |
| :---------------------- | :--------------------------------------------------------------------- |
| label: string \| number | 列表项 label                                                           |
| id: string              | 列表项 id，必须有                                                      |
| icon?: string           | icon，[material icon](https://material.io/tools/icons/?style=baseline) |
| extras?: any            | 附加的一些  和此列表项有关的数据                                       |

NestedListSubListData

| Name                          | Description        |
| :---------------------------- | :----------------- |
| title: NestedListItemData     | 子列表 title       |
| children: NestedListMixData[] | 子列表包含的列表项 |

NestedListMixData

```typescript
type NestedListMixData = NestedListItemData | NestedListSubListData;
```

NestedListData

```typescript
type NestedListData = NestedListMixData[];
```

NestedListItemClick

| Name                                    | Description             |
| :-------------------------------------- | :---------------------- |
| item: NestedListItemData                | 列表项数据              |
| id: NestedListItemData['id']            | 列表项 id               |
| idPath: Array<NestedListItemData['id']> | 列表项与其上层子列表 id |

NestedListItemSelect

```typescript
type NestedListItemSelect = NestedListItemClick;
```

## Dependencies

- angular7
- angular/material7 icon list
