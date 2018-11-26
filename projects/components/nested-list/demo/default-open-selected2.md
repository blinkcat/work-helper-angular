## source code

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { NestedListData } from '../nested-list.service';

@Component({
  selector: 'demo-default-open-selected',
  template: `
    <bc-nested-list [dataSource]="data" [openSubs]="openSubs" [selectedItem]="selectedItem"></bc-nested-list>
  `,
  styles: [
    `
      .active {
        background: red;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DefaultOpenSelectedComponent {
  openSubs = ['test2', 'test2-child2'];
  selectedItem = 'test2-child2-child2';

  data: NestedListData = [
    {
      label: 'test1',
      icon: 'unarchive',
      id: 'test1'
    },
    {
      title: { label: 'test2', icon: 'unarchive', id: 'test2' },
      children: [
        {
          label: 'test2-child1',
          id: 'test2-child1'
        },
        {
          title: { label: 'test2-child2', icon: 'unarchive', id: 'test2-child2' },
          children: [
            {
              label: 'test2-child2-child1',
              id: 'test2-child2-child1'
            },
            {
              label: 'test2-child2-child2',
              id: 'test2-child2-child2'
            },
            {
              label: 'test2-child2-child3',
              id: 'test2-child2-child3'
            }
          ]
        }
      ]
    },
    {
      title: { label: 'test3', icon: 'unarchive', id: 'test3' },
      children: [
        {
          label: 'test3-child1',
          id: 'test3-child1'
        },
        {
          title: { label: 'test3-child2', id: 'test3-child2' },
          children: [
            {
              label: 'test3-child2-child1',
              id: 'test3-child2-child1'
            },
            {
              label: 'test3-child2-child2',
              id: 'test3-child2-child2'
            },
            {
              id: 'test3-child2-child3',
              label: 'test3-child2-child3'
            }
          ]
        }
      ]
    }
  ];
}
```
