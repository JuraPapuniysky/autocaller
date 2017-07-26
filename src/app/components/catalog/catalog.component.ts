import { Component, OnInit } from '@angular/core';
import {Catalog} from "./catalog";
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public catalogs: Catalog[];

  constructor(
      private auth: AuthService,
      private data: DataService
  ) { }

  ngOnInit() {

  }

}
