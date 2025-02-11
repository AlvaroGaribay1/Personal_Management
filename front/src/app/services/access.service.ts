import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  constructor(private httpClient: HttpClient) {}

  private API_SERVER = 'http://localhost:8080/access';

  public getAllAccess(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }
}
