import { Component, Input, OnInit } from '@angular/core';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';


@Component({
  template: `
    <button (click)="changePassword()">Change Password</button>
  `,
})
export class PasswordButtonComponent implements OnInit {

  public renderValue;

  config: ToasterConfig = null;

  @Input() value;

  constructor(private toasterService: ToasterService) {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  changePassword() {
    const toast: Toast = {
      type: 'default',
      title: null,
      body: 'Mail sent!',
      timeout: 5000,
      showCloseButton: false,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
