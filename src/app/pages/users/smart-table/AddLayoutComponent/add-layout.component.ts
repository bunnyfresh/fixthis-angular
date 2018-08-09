import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';

@Component({
  selector: 'ngx-add-layout',
  styleUrls: ['./add-layout.component.scss'],
  templateUrl: './add-layout.component.html',
})
export class AddLayoutComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.userHandlerForm = this._fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      tag: '',
      about: '',
      date: new FormControl('', Validators.required),
      scpeciality: '',
      transportation: '',
      languages: '',
      work: '',
      education: '',
      userType: new FormControl('', Validators.required),
    });
  }

  userHandlerForm: FormGroup;

  addNewUser(value: any): void {
      this._userService.addUserAPI(value, 201);
  }
}
