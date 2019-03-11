import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-loading [isLoading]="isLoading" [delay]="delay" [tip]="tip">
      <p>
        直接将其他元素或者component包裹在其中<br />
        go!
      </p>
    </bc-loading>

    <section class="board">
      <mat-checkbox [(ngModel)]="isLoading">isLoading</mat-checkbox>
      <br />
      <mat-form-field class="example-full-width">
        <input [(ngModel)]="delay" type="number" matInput placeholder="delay" value="delay" />
      </mat-form-field>
      <br />
      <mat-form-field class="example-full-width">
        <input [(ngModel)]="tip" matInput placeholder="tip" value="tip" />
      </mat-form-field>
    </section>
  `,
  styles: [
    `
      p {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
      .board {
        margin: 20px auto 0;
      }
    `
  ]
})
export class BasicComponent {
  isLoading = false;
  delay = 0;
  tip = '';
}
