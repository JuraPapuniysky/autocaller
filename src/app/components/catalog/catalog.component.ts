import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {Catalog} from "./catalog";
import {Search} from "./search";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

    public catalogs = [];
    public model = new Catalog('', '');
    public checker;
    public searchModel = new Search('', '');

    constructor(
        private data: DataService,
        private router: Router
    ) {
        this.checker = false;
    }

    ngOnInit() {
        this.catalog();
    }

    public catalog() {
        this.data.getUserCatalogs()
            .subscribe((res) => {
                console.log(res);
                this.catalogs = res;
            });
    }

    public addNumber() {
        this.data.addUserCatalog(this.model.name, this.model.number)
            .subscribe((res) => {
                if (res != false) {
                    this.catalogs.push(res);
                    console.log(this.catalogs);
                } else {
                    console.log('Problem with saving to database.');
                }
            });
    }

    public search(){
       this.data.searchUserCatalogByField(this.searchModel)
           .subscribe(
               (res) => {
                   console.log(res);
                   this.catalogs = res;
               }
           )
    }

    public deleteNumber(catalog){
        this.data.deleteNumber(catalog.id)
            .subscribe((res) => {
               if(res == true){
                   this.catalogs = this.catalogs.filter(obj => obj !== catalog);
               }
            });
    }

    public updateNumber(catalog){
        this.data.updatedCatalog = catalog;
        this.router.navigate(['/update-catalog']);
    }

}
