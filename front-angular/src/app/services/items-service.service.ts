import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
// import { HttpObserve } from '@angular/common/http/src/client';

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {

  // options: {
  //   body?: any; 
  //   headers?: HttpHeaders | { [header: string]: string | string[]; }; 
  //   // observe?: HttpObserve; 
  //   params?: HttpParams | { [param: string]: string | string[]; }; 
  //   reportProgress?: boolean; 
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text'; 
  //   withCredentials?: boolean; 
  // }

  // options: {
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text'
  // }

  readonly contextUrl = 'http://localhost:8000';
  readonly tableName = "/items";

  constructor(private http: HttpClient) {  
    // const httpOptions = this.options;
  }

  // constructor(private http: HttpClient) {  
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //       // Authorization: 'my-auth-token'
  //     })
  //   };
  // }

  getAll() {
    return this.http.get(this.contextUrl + this.tableName);
  }
  /*
  this.http.put(`${environment.apiUrl}` + '/users/save/' + this.studentId,
      {
        'email': this.email,
        'imie': this.name,
        'nazwisko': this.surname,
        'nrIndeksu': this.indexNumber,
        'projekty': s_projects,
        'stacjonarny': this.mode
      })
      .subscribe(
        data => {
          console.log('PUT Request is successful ', data);
        },
        error => {
          console.log('Error in put request Iwona :(', error);
        }
      );
  */

  get(id) {
    return this.http.get(this.contextUrl + this.tableName + `/${id}`);
  }

  create(data) {
    return this.http.post(this.contextUrl + this.tableName, data);
  }

  update(id, data) {
    return this.http.put(this.contextUrl + this.tableName + `/${id}`, data);
  }

  delete(id) {
    return this.http.delete(this.contextUrl + this.tableName + `/${id}`);
  }

  deleteAll() {
    return this.http.delete(this.contextUrl + this.tableName);
  }

  findByName(name) {
    return this.http.get(this.contextUrl + this.tableName + `?name=${name}`);
  }

}
