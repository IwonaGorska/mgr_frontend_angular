import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestsServiceService {

  readonly contextUrl = 'http://localhost:8000';
  readonly tableName = "/tests";

  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post(this.contextUrl + this.tableName, data);
  }

}
