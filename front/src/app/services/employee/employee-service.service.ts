import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private httpClient: HttpClient) {}

  private API_SERVER = 'http://localhost:8080/employees';

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }

  public saveEmployee(user: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, user);
  }

  public deleteEmployee(id: any): Observable<any> {
    return this.httpClient.delete(this.API_SERVER + '/' + id);
  }

  public getEmployeesByDepartment(id: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + '/department/' + id);
  }

}
