import { Component, AfterViewInit } from '@angular/core';
import { LightService } from '../light.service';
import md1 from './basic1.md';
import md2 from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-flex [direction]="'column'" [justify]="'center'" [align]="'center'" style="height:100%">
        <button mat-raised-button color="accent" id="f1">feature</button>
      </bc-flex>
    </bc-markdown-mcm>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }
    `
  ]
})
export class BasicComponent implements AfterViewInit {
  md1 = md1;
  md2 = md2;

  constructor(private lightService: LightService) {}

  ngAfterViewInit() {
    this.lightService.open(document.getElementById('f1')!);
  }
}
