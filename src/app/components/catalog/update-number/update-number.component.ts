import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-number',
  templateUrl: './update-number.component.html',
  styleUrls: ['./update-number.component.css']
})
export class UpdateNumberComponent implements OnInit {

  public model;

  constructor(
      private data: DataService,
      private router: Router
  ) { }

  ngOnInit() {
    this.model = this.data.updatedCatalog;
    console.log(this.model);
  }

  public updateNumber(){
    this.data.updateNumber(this.model)
        .subscribe((res) => {
            if (res == true){
              this.router.navigate(['/catalog']);
            }else {
              console.log('Fail to update!')
            }
        });
  }

}
