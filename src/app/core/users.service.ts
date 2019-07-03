import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { Logger } from '../core/logger.service';

const log = new Logger('UserService');

const routes = {
  get: `${env.apiUrl}/user/`
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<any> {
    return this.httpClient.get(routes.get);
  }
}
