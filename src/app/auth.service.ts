import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

const API_URL = 'https://centrocompartido.engux.com.ar:8443/sample-spring-rest';

@Injectable()
export class AuthService {
  authenticate = new Subject();

  constructor(private http: Http) { }

  signin(username: string, password: string) {
    return this.http.post(`${API_URL}/login`, { username, password });
  }

  signup(username: string, password: string) {
    return this.http.post(`${API_URL}/users/sign-up`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
