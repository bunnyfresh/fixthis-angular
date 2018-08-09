import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-modify-layout',
  styleUrls: ['./modify-layout.component.scss'],
  templateUrl: './modify-layout.component.html',
})
export class ModifyLayoutComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }

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
      userType2: new FormControl('', Validators.required),
    });
  }

  userHandlerForm: FormGroup;

  modifyUser(value: any): void {
    console.log(value);
    console.log(this.userHandlerForm.controls);
    if (this.userHandlerForm.valid) {
      const data = value;
      alert(data);
    }
  }
}
