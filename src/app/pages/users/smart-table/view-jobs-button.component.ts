import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: `
    <button (click)="example()">View Jobs</button>
  `,
})
export class JobsButtonComponent implements OnInit {

  public renderValue;

  @Input() value;

  constructor() {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  example() {
    alert(this.renderValue);
  }
}
