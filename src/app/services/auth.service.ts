import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";

import {Observable} from 'rxjs/Rx';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../components/auth/user";


@Injectable()
export class AuthService {

    private authUrl = 'http://localhost:5050/users/authenticate';

    constructor(private http: Http) {}

    public authToken(username: string, password: string): Observable<string[]> {
        let bodyRequest = JSON.stringify({
            username: username,
            password: password
        });

        let headers = new Headers({
            'Content-Type': 'application/json; charset=UTF-8','Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Credentials': true

        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.authUrl, bodyRequest, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUsers() {
        let url = 'http://localhost:5050/users';

        return this.http.get(url).map(
            (response: Response) => response.json()
        );

    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
