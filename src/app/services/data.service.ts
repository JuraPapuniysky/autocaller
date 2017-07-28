import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Body} from "@angular/http/src/body";
import {Search} from "../components/catalog/search";


@Injectable()
export class DataService {

  private url = 'http://localhost:5050';
  private token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('access-token');
  }

  public getUserCatalogs(){
    let body = new FormData();
    body.append('access_token', this.token);

    return this.http.post(this.url+'/catalogs/catalog', body).map(
        (res: Response) => res.json()
    );
  }

  public addUserCatalog(name, number){
    let body = new FormData();
    body.append('name', name);
    body.append('number', number);
    body.append('access_token', localStorage.getItem('access-token'));

     return this.http.post(this.url+'/catalogs/add-catalog', body)
        .map((res: Response) => res.json());
  }

  public searchUserCatalogByField(searsh: Search){
    let body = new FormData();
    body.append('name', searsh.name);
    body.append('number', searsh.number);
    body.append('access_token', localStorage.getItem('access-token'));

    return this.http.post(this.url+'/catalogs/search', body)
        .map((res: Response) => res.json());
  }

  public deleteNumber(id){
    let body = new FormData();
    body.append('id', id);

    return this.http.post(this.url+'/catalogs/delete-number', body)
        .map((res: Response) => res.json());
  }


}
