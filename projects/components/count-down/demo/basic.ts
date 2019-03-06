import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-count-down [target]="target"></bc-count-down>
  `
})
export class BasicComponent implements OnInit {
  target!: Date;

  ngOnInit() {
    this.target = new Date(Date.now() + 10 * 60 * 60 * 1000);
  }
}
