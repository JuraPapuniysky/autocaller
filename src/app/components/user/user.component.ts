import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(){
    this.data.getUsers().subscribe(
        (data) => {
          console.log(data);
          this.users = data;
        }
    );
  }

}
