import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  upcomingEvents: any
  searchDate: any
  searchResult: any = []
  updateId = 0
  oldData: any = []

  oldDate=''
  oldDescription=''


  constructor(private ds: DataService, private modalService: NgbModal) {

    const userId = JSON.parse(localStorage.getItem('currentId') || '')

    this.ds.eventList(userId)
      .subscribe((result: any) => {
        if (result) {

          this.upcomingEvents = result.message

        }
      },
        (result) => {
          alert(result.error.message)
        }
      )

  }

  ngOnInit(): void {
  }
  removeItem(e: any) {
    const userId = parseInt(JSON.parse(localStorage.getItem('currentId') || ''))
    this.ds.removeItem(userId, e.date, e.description)
      .subscribe((result: any) => {
        if (result) {
          alert('event deleted')
          location.reload()
        }
      })
  }
  findEvent() {
    this.searchResult = []
    const userId = parseInt(JSON.parse(localStorage.getItem('currentId') || ''))
    this.ds.findEvent(userId, this.searchDate)
      .subscribe((result: any) => {
        if (result) {
          result.message.forEach((element: any) => {
            if (element.date == this.searchDate) {
              console.log(element);
              this.searchResult.push(element)
            }
          });
          this.upcomingEvents = this.searchResult
          if (this.searchResult == '') {
            alert('No events found on selected date')
            location.reload()
          }
        }
      })
  }
  clearSearch() {
    location.reload()
  }
  editEvent(e:any) {
    const userId = parseInt(JSON.parse(localStorage.getItem('currentId') || ''))
    this.oldData.push(e.date)
    this.oldData.push(e.description)
    this.ds.sendMessage(this.oldData) 
    
  }


}
