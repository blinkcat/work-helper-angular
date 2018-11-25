import { Component } from '@angular/core';
import { NestedListData } from '../nested-list.service';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-nested-list
      #list="bcNestedList"
      [autoOpen]="true"
      [dataSource]="data"
      [selectedItem]="selectedItem"
    ></bc-nested-list>

    <p>openSubs: {{ list.openSubs | json }}</p>
    <p>selectedItem: {{ list.selectedItem }}</p>
  `
})
export class BasicComponent {
  selectedItem = 'test2-child2-child3';
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
