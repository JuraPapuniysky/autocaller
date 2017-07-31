import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {List} from './list';
import {Router} from '@angular/router';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

    public list;
    public listName = '';
    public lists;
    public listAddFormChecker;
    public catalogs;
    public listCatalogs;


    public model = new List('');

    constructor(private data: DataService,
                private router: Router,) {
        this.listAddFormChecker = false;
    }

    ngOnInit() {
        this.getLists();
        this.getCatalogs();
    }

    public getCatalogs() {
        this.data.getUserCatalogs()
            .subscribe((res) => {
                if (res != false) {
                    this.catalogs = res;
                }
            })
    }

    public showAddListForm() {
        if (!this.listAddFormChecker) {
            this.listAddFormChecker = true;
        } else {
            this.listAddFormChecker = false;
        }
    }

    public getLists() {
        this.data.lists().subscribe((res) => {
            if (res != false) {
                this.lists = res;
            }
        });
    }

    public addList() {
        this.data.addList(this.model)
            .subscribe(res => {
                if (res != false) {
                    this.lists = res;
                }
            });
    }

    public updateList() {
        this.data.updateList(this.list)
            .subscribe((res) => {
                if (res != false) {
                    this.lists = res;
                }
            });
    }

    public deleteList(list) {
        this.data.deleteListName(list)
            .subscribe((res) => {
                if (res != false) {
                    this.lists = res;
                }
            });
    }

    public showNumbers(list) {
        this.list = list;
        this.listName = list.name;

        this.data.showListCatalog(list)
            .subscribe((res) => {
                if (res != false) {
                    this.listCatalogs = res;
                }
            });
    }

    public addNumber(catalog) {
        this.data.addNumberToList(this.list, catalog)
            .subscribe((res) => {
                if (res != false) {
                    this.listCatalogs = res
                }
            })
    }

}
