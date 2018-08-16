import {Component, OnDestroy} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css'],
   providers: [LoginService],
})
export class LoginComponent implements OnDestroy {
   viewMessage: string;
   subscription: Subscription;
   successStatus: boolean;
   constructor(private _LoginService: LoginService, private _router: Router) {
      const userInfo = localStorage.getItem('token');

     this.subscription = this._LoginService.refresh(userInfo).subscribe(response => {
         // check if login is authenticated or not
         if (response.status == '200') {
           this.successStatus = true;
           localStorage.setItem('token', JSON.stringify(response.token));
           this._router.navigate(['/pages/dashboard']);
         }
         // display error message
         this.viewMessage = response.message;
       },
       err => {
         this.viewMessage = 'Some error in authentication';
       });
   }
   onLoginSubmit(value: any) {
      const me = this;
      const email = value.username;
      const password = value.password;
      me.viewMessage = '';
      me.successStatus = false;
      this.subscription = this._LoginService.authenicate(email, password).subscribe(response => {
         // check if login is authenticated or not
         if (response.status == '200') {
            me.successStatus = true;
            localStorage.setItem('token', JSON.stringify(response.token));
            this._router.navigate(['/pages/dashboard']);
         }
         // display error message
         me.viewMessage = response.message;
      },
         err => {
            me.viewMessage = 'Some error in authentication';
         });
   }

   ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }
}
