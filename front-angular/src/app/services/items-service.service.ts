import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {

  // options: {
  //   headers?: HttpHeaders | {[header: string]: string | string[]},
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
  //   withCredentials?: boolean,
  // }



  constructor(private http: HttpClient) {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
  }

  getAll() {
    return this.http.get("/items");
  }

  get(id) {
    return this.http.get(`/items/${id}`);
  }

  create(data) {
    return this.http.post("/items", data);
  }

  update(id, data) {
    return this.http.put(`/items/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`/items/${id}`);
  }

  deleteAll() {
    return this.http.delete(`/items`);
  }

  findByName(name) {
    return this.http.get(`/items?name=${name}`);
  }

}
