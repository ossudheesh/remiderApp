import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myDate = ""
  description = ""
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '')
  currentId = ""
  updateId = 0

  addForm = new FormGroup({
    myDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private ds: DataService, private router: Router,) {
  }

  ngOnInit(): void {
    this.ds.msg$
      .subscribe(message => {
        if (message) {
          this.updateId = 1
        }
      })
  }

  deleteFromParent() {
    this.currentId = JSON.parse(localStorage.getItem("currentId") || '')
  }
  onCancel() {
    this.currentId = ""
  }
  onDelete() {
    this.currentId = JSON.parse(localStorage.getItem("currentId") || '')

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
  addEvent() {
    let eventDate = this.addForm.value.myDate
    let eventDescription = this.addForm.value.description
    const userId = JSON.parse(localStorage.getItem('currentId') || '')
    if (this.addForm.valid) {
      this.ds.addEvent(userId, eventDate, eventDescription)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            location.reload();
          }
        },
          (result: any) => {
            alert(result.error.message)
          }
        )
    }
    else{
      alert('Please fill all the fields')
    }
  }
  get addDate(){
    return this.addForm.get('myDate')
  }
  logout() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentId")
    this.router.navigateByUrl("")
  }
}
