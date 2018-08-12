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

  addUserAPI(formSubmittedData: any, userId: number) {

    const fieldsToSubmit = [
      'fname',
      'lname',
      'email',
      'location',
      'phone',
      'tag',
      'about',
      'date',
      'scpeciality',
      'transportation',
      'languages',
      'work',
      'education',
      'userType',
    ];

    const fieldsToSubmit2 = [
      'first_name',
      'last_name',
      'email',
      'location',
      'isFixer',
      'mobile_number',
      'tagline',
      'about',
      'userSkills',
      'birth_date',
      'profile_pic',
      'cover_pic',
    ];

    const formSubmittedData2 = formSubmittedData;
    formSubmittedData2['first_name'] = formSubmittedData['fname'];
    formSubmittedData2['last_name'] = formSubmittedData['lname'];
    formSubmittedData2['isFixer'] = formSubmittedData['userType'];
    formSubmittedData2['mobile_number'] = formSubmittedData['phone'];
    formSubmittedData2['tagline'] = formSubmittedData['tag'];
    formSubmittedData2['birth_date'] = formSubmittedData['date'];

    console.log(formSubmittedData2)

    const userformData: any = [];

    // prepare form data to be submitted
    _.each(fieldsToSubmit, function (field) {
      userformData.push(field, formSubmittedData2[field]);
    });


    if (userId) {
      formSubmittedData.id = userId;
      userformData.push('user_id', formSubmittedData2['id']);
    }

    userformData.push('asPoster', '0');

    console.log(userformData)

    // prepare post request to be sent
    return this._http.post(AppSettings.API_ENDPOINT + 'admin/user/handle', userformData).map((res: Response) => {
      return res.json();
    })
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }

  /**
   *  function to change password of user
   *  @param userId id of the user
   *  **/
  onChangePassword(userId) {
    const userStatusParams = Qs.stringify({ "user_id": userId });
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this._http.post(AppSettings.API_ENDPOINT + `admin/user/resetpassword`, userStatusParams).map((res: Response) => { return res.json() })
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }
}
