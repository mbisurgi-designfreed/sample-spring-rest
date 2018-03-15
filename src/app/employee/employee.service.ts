import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Employee } from './employee';

const API_URL = 'http://localhost:8080';

@Injectable()
export class EmployeeService {
  employeeEvent = new Subject();
  employees: Employee[];

  constructor(private http: Http) { }

  getAll() {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http.get(`${API_URL}/employee/list`, { headers });
  }

  getById(id: string) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http.get(`${API_URL}/employee/find/${id}`, { headers });
  }

  insert(employee: Employee) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http.post(`${API_URL}/employee/new`, employee, { headers });
  }

  update(id: String, employee: Employee) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http.patch(`${API_URL}/employee/edit/${id}`, employee, { headers });
  }

  delete(id: String) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http.delete(`${API_URL}/employee/delete/${id}`, { headers });
  }
}
