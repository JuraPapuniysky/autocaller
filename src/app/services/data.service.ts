import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";


@Injectable()
export class DataService {

  private url = 'http://localhost:5050/users';
  private authToken;

  constructor(private http: Http) {
    this.authToken = localStorage.getItem('access-token');
    console.log(this.authToken);
  }

  getUsers() {

    let headers = new Headers({'Authorization': `Bearer ${this.authToken}`});
    console.log(this.authToken);
   // headers.append('Authorization', `Bearer ' + ${this.authToken}`);
    let options = new RequestOptions({headers: headers, body: ''});
    return this.http.get(this.url, {headers: headers}).map(
        (response) => response.json()
    );
  }

}
