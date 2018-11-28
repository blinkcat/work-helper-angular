import { Component } from '@angular/core';
import { NestedListData } from '../nested-list.service';

import md1 from './basic1.md';
import md2 from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-nested-list [dataSource]="data"></bc-nested-list>
    </bc-markdown-mcm>
  `
})
export class BasicComponent {
  md1: string = md1;
  md2: string = md2;

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
