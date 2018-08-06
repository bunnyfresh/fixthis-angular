import { Http, Response, Headers } from '@angular/http';
import { HttpInterceptor } from '../utils/httpInterceptor';
import { AppSettings } from '../app.settings';
import { Injectable } from '@angular/core';
import * as Qs from 'query-string';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RequestOptions } from '@angular/http/src/base_request_options';

@Injectable()
export class DashboardService {

   constructor(protected _http: HttpInterceptor) { }

   // /**
   //    * function to get dashboard graph counts
   //    */
   getGraphCount() {
      var apiUrl = AppSettings.API_ENDPOINT + `admin/dashboard`;
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      return this._http.get(apiUrl, true).map((res: Response) => { return res.json() })
         .catch((error: any) => {
            if (error.status > 400 || error.status === 500) {
               return Observable.throw(new Error(error.json()));
            }
         });
   }
}
