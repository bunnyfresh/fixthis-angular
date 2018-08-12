import { Component, Input, OnInit } from '@angular/core';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';


@Component({
  template: `
    <button (click)="changePassword()">Change Password</button>
  `,
})
export class PasswordButtonComponent implements OnInit {

  public renderValue;

  config: ToasterConfig = null;
  subscriptions: Subscription = new Subscription;

  @Input() value;

  constructor(private toasterService: ToasterService,
              private _userService: UserService) {  }

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
    alert('Mail sent!');

    const uploadFileSubscription = this._userService.onChangePassword(this.renderValue).subscribe(response => {
      if (response.status == '200') {
        alert('Password has been sent to email address successfully.');
      } else if (response.status == '500') {
        alert('Error sending password.');
      }
    }, error => {
      alert('Error sending password.');
    });
    this.subscriptions.add(uploadFileSubscription);
  }
}
