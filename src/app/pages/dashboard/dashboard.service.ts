import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as Qs from 'query-string';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { HttpInterceptor } from '../../utils/httpInterceptor';
import { AppSettings } from '../../app.settings';

@Injectable()
export class DashboardService {

   constructor(protected _http: HttpInterceptor) { }

   // /**
   //    * function to get dashboard graph counts
   //    */
   getGraphCount() {
      const apiUrl = AppSettings.API_ENDPOINT + `admin/dashboard`;
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      return this._http.get(apiUrl, true).map((res: Response) => res.json())
         .catch((error: any) => {
            if (error.status > 400 || error.status === 500) {
               return Observable.throw(new Error(error.json()));
            }
         });
   }

  getGraphInfo() {
    const apiUrl = AppSettings.API_ENDPOINT + `admin/jobs-stat`;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return this._http.get(apiUrl, true).map((res: Response) => res.json())
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }
}
