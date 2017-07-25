import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Body} from "@angular/http/src/body";


@Injectable()
export class DataService {

  private url = 'http://localhost:5050/users/get-users';
  private authToken;

  constructor(private http: Http) {
    this.authToken = localStorage.getItem('access-token');
    console.log(this.authToken);
  }

  getUsers() {

    //let headers = new Headers({'Authorization': `Bearer ${this.authToken}`});
    let headers = new Headers();

    //headers.append('Access-Control-Allow-Origin', this.url);
    //headers.append('Allow-Cross-Origin', '*');
    headers.append('Authorization', `Bearer ${this.authToken}`);
    headers.append('Content-Type', 'application/json');
    //let options = new RequestOptions({headers: headers});
    //console.log(options);
    //let autorization =  { 'Authorization': `Bearer ${this.authToken}` }
    let body = new FormData();
    return this.http.options(this.url, {headers: headers}).map(
        (response: Response) => response.json()
    );
  }

}
