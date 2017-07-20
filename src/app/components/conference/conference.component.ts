import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  public title = 'Hello Conference';

  constructor() { }

  ngOnInit() {
  }

}
