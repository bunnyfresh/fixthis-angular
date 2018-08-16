import {Http, Response, Headers} from '@angular/http';
import {AppSettings} from '../app.settings';
import {Injectable} from '@angular/core';
import * as Qs from 'query-string';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {

    constructor(protected _http: Http) {}


    authenicate(email: string, password: string) {
        const params = {'email': email, 'password': password};
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // var stringifiedParams = Qs.stringify(params);
        return this._http.post(AppSettings.API_ENDPOINT + 'admin/auth', null, {
            headers: headers,
            body: JSON.stringify(params),
        }).map((res: Response) => res.json())
            .catch((error: any) => {
                if (error.status > 400 || error.status === 500) {
                    return Observable.throw(new Error(error.json()));
                }
            });
    }

  refresh(token: string) {
    const params = {token};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // var stringifiedParams = Qs.stringify(params);
    return this._http.post(AppSettings.API_ENDPOINT + 'admin/refreshtoken', null, {
      headers: headers,
      body: JSON.stringify(params),
    }).map((res: Response) => res.json())
      .catch((error: any) => {
        if (error.status > 400 || error.status === 500) {
          return Observable.throw(new Error(error.json()));
        }
      });
  }
}
