import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SmartTableService} from "../../../../@core/data/smart-table.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'ngx-modify-layout',
  styleUrls: ['./modify-layout.component.scss'],
  templateUrl: './modify-layout.component.html',
})
export class ModifyLayoutComponent implements OnInit {
  constructor(private _fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.userHandlerForm = this._fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      femail: '',
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
      userType2: new FormControl('', Validators.required),
    });
  }

  userHandlerForm: FormGroup;

  modifyUser(value: any): void {
    console.log('bad');
    /*
    console.log(value);
    console.log(this.userHandlerForm.controls);
    if (this.userHandlerForm.valid) {
      const data = value;
      alert(data);
    }*/
  }

  getUserData(value: any): void {
    console.log(value['femail']);
    this.userService.callGetAPI(1, 1, value['femail'], null, null).subscribe(responce => {
      const data = responce;

      console.log(data);
    });
  }
}
