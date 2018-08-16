import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';

@Component({
  selector: 'ngx-add-layout',
  styleUrls: ['./add-layout.component.scss'],
  templateUrl: './add-layout.component.html',
  providers: [UserService],
})
export class AddLayoutComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.userHandlerForm = this._fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      mobile_number: new FormControl('', Validators.required),
      tagline: '',
      about: '',
      birth_date: new FormControl('', Validators.required),
      scpeciality: '',
      transportation: '',
      languages: '',
      work: '',
      education: '',
      isFixer: new FormControl('', Validators.required),
    });
  }

  userHandlerForm: FormGroup;

  addNewUser(value: any): void {
      this._userService.submitUserData(value, 300);
  }
}
