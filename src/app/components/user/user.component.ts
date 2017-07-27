import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users;

    public user;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
      console.log(this.user);
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
