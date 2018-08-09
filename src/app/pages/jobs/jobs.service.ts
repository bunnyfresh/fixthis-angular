import { Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpInterceptor } from '../../utils/httpInterceptor';
import { AppSettings } from '../../app.settings';

import * as Qs from 'query-string';

@Injectable()
export class JobsService {

  constructor(protected _http: HttpInterceptor) { }

  // /**
  //    * function to get dashboard graph counts
  //    */
  getAllJobs(pp, pg, searchKey, jobStatus, userJobs) {
    const myParams = new URLSearchParams();
    myParams.append('pp', pp);
    myParams.append('pg', pg);
    if (!_.isEmpty(searchKey)) {
      myParams.append('search_key', searchKey);
    }
    if (!_.isEmpty(jobStatus)) {
      myParams.append('job_status', jobStatus);
    }
    if (!_.isEmpty(userJobs)) {
      myParams.append('jobs_for_user', userJobs);
    }
    const apiUrl = AppSettings.API_ENDPOINT + `admin/jobs` + '?' + myParams;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return this._http.get(apiUrl, true).map((res: Response) => res.json())
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }

  deleteJobAPI(jobId, userId) {
    const deleteParams = Qs.stringify({ 'userId': userId, 'id': jobId });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.delete(AppSettings.API_ENDPOINT + `admin/job/delete`, deleteParams)
                      .map((res: Response) => res.json())
                      .catch((error: any) => {
                        if (error.status > 400 || error.status === 500) {
                          return Observable.throw(new Error(error.json()));
                        }
                      });
  }
}
