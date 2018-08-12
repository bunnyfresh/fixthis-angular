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
export class UserService {

  constructor(protected _http: HttpInterceptor) { }

  // /**
  //    * function to get dashboard graph counts
  //    */
  callGetAPI(pp, pg, searchKey, userStatus, userType) {
    const myParams = new URLSearchParams();

    myParams.append('pp', pp);
    myParams.append('pg', pg);
    if (!_.isEmpty(searchKey)) {
      myParams.append('search_key', searchKey);
    }
    if (!_.isEmpty(userStatus)) {
      myParams.append('status', userStatus);
    }
    if (!_.isEmpty(userType)) {
      myParams.append('user_type', userType);
    }

    const apiUrl = AppSettings.API_ENDPOINT + `admin/users` + '?' + myParams;
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    return this._http.get(apiUrl, true).map((res: Response) => {
      return res.json();
    })
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }

  deleteUserAPI(userId) {
    const deleteParams = Qs.stringify({ 'userId': userId });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.delete(AppSettings.API_ENDPOINT + `admin/user/delete`, deleteParams)
                      .map((res: Response) => res.json())
                      .catch((error: any) => {
                        if (error.status > 400 || error.status === 500) {
                          return Observable.throw(new Error(error.json()));
                        }
                      });
  }

  /**
   * function to add user
   * @param: formSubmittedData Data submitted by user
   * @param: userId id of the user
   */
  submitUserData(formSubmittedData: any, userId: number) {

    const fieldsToSubmit = [
      'first_name',
      'last_name',
      'email',
      'location',
      'isFixer',
      'mobile_number',
      'tagline',
      'about',
      'birth_date',
    ];

    const userformData: FormData = new FormData();

    userformData.append('profile_pic', 'test-photo');
    userformData.append('cover_pic', 'test-photo');

    // prepare form data to be submitted
    _.each(fieldsToSubmit, function (field) {
      userformData.append(field, formSubmittedData[field])
    });

    userformData.append('userSkills',
     `${formSubmittedData['transportation']}
            ${formSubmittedData['languages']}
            ${formSubmittedData['work']}
            ${formSubmittedData['education']}
            ${formSubmittedData['scpeciality']}`);

    if (userId) {
      formSubmittedData.id = userId;
      userformData.append('user_id', formSubmittedData['id']);
    }

    userformData.append('asPoster', '0');

    // prepare post request to be sent
    return this._http.postWithProgress(AppSettings.API_ENDPOINT + 'admin/user/handle', userformData);
  }

  /**
   *  function to change password of user
   *  @param userId id of the user
   *  **/
  onChangePassword(userId) {
    const userStatusParams = Qs.stringify({ 'user_id': userId });
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this._http.post(AppSettings.API_ENDPOINT + `admin/user/resetpassword`, userStatusParams)
                     .map((res: Response) => res.json() )
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }
}
