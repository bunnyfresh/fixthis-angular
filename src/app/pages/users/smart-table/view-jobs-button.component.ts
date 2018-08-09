import { Component, Input, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  template: `
    <button (click)="example()">View Jobs</button>
  `,
})
export class JobsButtonComponent implements OnInit {

  public renderValue;

  @Input() value;

  constructor(private userService: UserService) {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  example() {
    alert('User id - ' + this.renderValue);
  }
}
