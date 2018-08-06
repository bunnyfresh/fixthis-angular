import { JwtHelperService } from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
@Injectable()
export class SessionCheckService {
   constructor() {};

   public validate(token: string): Observable<any> {
      var jwtHelper = new JwtHelperService();
      return Observable.interval(60).map((x) => !jwtHelper.isTokenExpired(token));
   }

}