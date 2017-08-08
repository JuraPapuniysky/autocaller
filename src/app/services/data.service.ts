import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Search } from "../components/catalog/search";
import { UpdateNumber } from "../components/catalog/update-number/update-number";
import { List } from "../components/lists/list";


@Injectable()
export class DataService {

  private url = 'http://localhost:5050';
  private token: string;


  public updatedCatalog;

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

  public updateNumber(model: UpdateNumber){
    let body = new FormData();
    body.append('id', model.id.toString());
    body.append('name', model.name);
    body.append('number', model.number);

    return this.http.post(this.url+'/catalogs/update-number', body)
      .map((res: Response) => res.json());
  }

  public deleteNumber(id){
    let body = new FormData();
    body.append('id', id);

    return this.http.post(this.url+'/catalogs/delete-number', body)
      .map((res: Response) => res.json());
  }

  public lists(){
    let body = new FormData();
    body.append('access_token', this.token);

    return this.http.post(this.url+'/lists/lists', body)
      .map((res: Response) => res.json());
  }

  public addList(model: List){
    let body = new FormData();
    body.append('name', model.name);
    body.append('access_token', this.token);

    return this.http.post(this.url+'/lists/add-list', body)
      .map((res: Response) => res.json());
  }

  public updateList(list){
    let body = new FormData;
    body.append('access_token', this.token);
    body.append('id', list.id);
    body.append('name', list.name);

    return this.http.post(this.url+'/lists/update-list', body)
      .map((res: Response) => res.json());
  }
  
  public deleteListName(list){
    let body = new FormData();
    body.append('list_id', list.id);
    body.append('access_token', this.token);

    return this.http.post(this.url+'/lists/delete-list', body)
      .map((res: Response) => res.json());
  }

  public showListCatalog(list){
    let body = new FormData();
    body.append('access_token', this.token);
    body.append('list_id', list.id);

    return this.http.post(this.url+'/lists/list-catalog', body)
      .map((res: Response) => res.json());
  }

  public getActiveList(){
      return this.http.get(this.url+'/lists/active-list')
          .map((res: Response) => res.json());
  }

  public addNumberToList(list, catalog){
    let body = new FormData();
    body.append('access_token', this.token);
    body.append('list_id', list.id);
    body.append('catalog_id', catalog.id);

    return this.http.post(this.url+'/lists/add-num', body)
      .map((res: Response) => res.json());
  }

  public deleteNumberFromList(list, catalog){
    let body = new FormData();
    body.append('access_token', this.token);
    body.append('list_id', list.id);
    body.append('catalog_id', catalog.id);

    return this.http.post(this.url+'/lists/delete-num', body)
      .map((res: Response) => res.json());
  }

}
