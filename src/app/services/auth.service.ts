import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from "@angular/http";


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class AuthService {

    private authUrl = 'http://localhost:5050/users/authenticate';

    constructor(private http: Http) {
    }

    public authToken(username: string, password: string) {
        let body = new FormData();
        body.append('username', username);
        body.append('password', password);

        return this.http.post(this.authUrl, body)
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    console.log(res);
                    console.log(res.access_token);
                    localStorage.setItem('access-token', res.access_token);
                }
            );
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
