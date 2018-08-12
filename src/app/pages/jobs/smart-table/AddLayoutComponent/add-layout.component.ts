import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-add-layout',
  styleUrls: ['./add-layout.component.scss'],
  templateUrl: './add-layout.component.html',
})
export class AddLayoutComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.jobHandlerForm = this._fb.group({
      jtitle: new FormControl('', Validators.required),
      descr: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      hours: '',
      noffixers: '',
      enddate: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      rate: '',
      jtype: new FormControl('', Validators.required),
    });
  }

  jobHandlerForm: FormGroup;

  addJob(value: any): void {
    console.log(value);
    console.log(this.jobHandlerForm.controls);
    if (this.jobHandlerForm.valid) {
      const data = value;
      alert(data);
    }
  }
}
