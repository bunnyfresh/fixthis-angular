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
    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 10000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideDown',
      limit: 3,
    });
    const toast: Toast = {
      type: 'info',
      title: null,
      body: 'Mail sent!',
      timeout: 10000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
