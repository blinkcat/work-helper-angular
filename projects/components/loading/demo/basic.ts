import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-loading [size]="'small'"></bc-loading>
    <bc-loading></bc-loading>
    <bc-loading [size]="'large'"></bc-loading>
  `
})
export class BasicComponent {}
