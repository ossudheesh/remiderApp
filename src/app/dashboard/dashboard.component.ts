import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myDate=""
  description=""
  currentUser=JSON.parse(localStorage.getItem('currentUser') || '')
  currentId=""
  updateId=0


  constructor(private ds:DataService,private router:Router) {
   }

  ngOnInit(): void {
    this.ds.msg$
    .subscribe(message=>{
      if(message){
        this.updateId=1
      }
    })
  }
  
  deleteFromParent() {
    this.currentId = JSON.parse(localStorage.getItem("currentId")||'')
  }
  onCancel() {
    this.currentId = ""
  }
  onDelete() {
    this.currentId = JSON.parse(localStorage.getItem("currentId")||'')

    this.ds.onDelete(this.currentId)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          this.router.navigateByUrl("")
        }
      },
        (result: any) => {
          alert(result.error.message)
        }
      )
  }
  addEvent(){
    let eventDate=this.myDate
    let eventDescription=this.description
    const userId= JSON.parse(localStorage.getItem('currentId') || '')
    this.ds.addEvent(userId,eventDate, eventDescription)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            location.reload();
          }
        },
          (result:any) => {
            alert(result.error.message)
          }
        )
  }
  logout() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentId")
    this.router.navigateByUrl("")
  }
}
