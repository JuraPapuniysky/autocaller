import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {Catalog} from "./catalog";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public catalogs: any;
  public model = new Catalog('', '');


  constructor(
      private auth: AuthService,
      private data: DataService,
      private router: Router
  ) {  }

  ngOnInit() {
    this.catalog();
  }

  catalog(){
    this.data.getUserCatalogs()
        .subscribe((res) => {
          console.log(res);
          this.catalogs = res;
        });
  }

  public addCatalog(){

  }

}
