import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as _ from 'lodash';
import {HttpRequest, HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpInterceptor {

   constructor(private http: Http, private _cHttp: HttpClient) {}

   createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', 'Bearer '+_.trim(localStorage.getItem("token"), '"'));
   }

   get(url, restricted) {
      let headers = new Headers();
      if (restricted) {
         this.createAuthorizationHeader(headers);
      }
      return this.http.get(url, {
         headers: headers
      });
   }

   put(url, data) {
    let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.createAuthorizationHeader(headers);
      return this.http.put(url, data, {
         headers: headers
      });
 }

   post(url, data) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.createAuthorizationHeader(headers);
      return this.http.post(url, data, {
         headers: headers
      });
   }

   delete(url, data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
       headers: headers,
       body: data
    });
 }

   postWithProgress(url, data) {
      var postReq =  new HttpRequest('POST', url, data, {
         reportProgress: true,
         headers: new HttpHeaders().set('Authorization','Bearer '+ _.trim(localStorage.getItem("token"), '"'))
      });
      return this._cHttp.request(postReq);
   }
}