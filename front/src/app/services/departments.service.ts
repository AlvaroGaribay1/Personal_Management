import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private httpClient: HttpClient) {}

  private API_SERVER = 'http://localhost:8080/departments';

  public getAllDepartments(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }

  public getDepartmentById(id: any) {
    return this.httpClient.get(this.API_SERVER + "/" + id);
  }

}
