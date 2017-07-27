import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from "@angular/http";


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../components/auth/user";



@Injectable()
export class AuthService {

    private isUserLoggedIn;
    public user: any;

    private authUrl = 'http://localhost:5050/users';
    public tokenKey: string = 'access-token';
    private userKey: string = 'user';


    constructor(private http: Http) {
        this.isUserLoggedIn = false;
    }

    public setUserLoggedIn(){
        this.isUserLoggedIn = true;
    }

    public getUserLoggedIn(){
        return this.isUserLoggedIn;
    }

    public logOut(){
        localStorage.removeItem('access-token');
        this.isUserLoggedIn = false;
    }

    public authToken(username: string, password: string) {
        let body = new FormData();
        body.append('username', username);
        body.append('password', password);
        console.log(username);
        return this.http.post(this.authUrl+'/authenticate', body)
            .map((res: Response) => res.json());
    }

    public authByToken(){
        let body = new FormData();
        body.append('access_token', localStorage.getItem('access-token'));
        return this.http.post(this.authUrl+'/user', body)
            .map((res: Response) => res.json());
    }








}
