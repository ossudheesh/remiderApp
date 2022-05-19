import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  newDate=""
  newDescription=""
  update=false
  constructor() { }

  ngOnInit(): void {
  }
  updateEvent(){

  }

}
