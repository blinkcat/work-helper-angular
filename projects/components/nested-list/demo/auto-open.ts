import { Component, ViewEncapsulation } from '@angular/core';
import { NestedListData } from '../nested-list.service';

import md1 from './auto-open1.md';
import md2 from './auto-open2.md';

@Component({
  selector: 'demo-auto-open',
  template: `
    <bc-markdown-man>
      <bc-markdown-man-md>{{ md1 }}</bc-markdown-man-md>
      <bc-markdown-man-comp>
        <bc-nested-list [dataSource]="data" [autoOpen]="true" [selectedItem]="selectedItem"></bc-nested-list>
      </bc-markdown-man-comp>
      <bc-markdown-man-md>{{ md2 }}</bc-markdown-man-md>
    </bc-markdown-man>
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
export class AutoOpenComponent {
  md1: string = md1;
  md2: string = md2;

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
