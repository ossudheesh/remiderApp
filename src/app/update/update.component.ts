import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventsComponent } from '../events/events.component';
import { DataService } from '../services/data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  newDate = ""
  newDescription = ""
  updateId = 0
  oldDate = ''
  oldDescription = ''
  data: any = []

  updateForm = new FormGroup({
    newDate: new FormControl('', Validators.required),
    newDescription: new FormControl('', Validators.required)
  })


  constructor(private ds: DataService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.ds.msg$
      .subscribe(message => {
        if (message) {
          this.updateId = 1
          this.oldDate = message[0]
          this.oldDescription = message[1]
        }
      })
  }
  updateEvent() {
    let oldDate = this.oldDate
    let oldDescription = this.oldDescription
    let newDate = this.updateForm.value.newDate
    let newDescription = this.updateForm.value.newDescription
    this.data.push(oldDate)
    this.data.push(oldDescription)
    this.data.push(newDate)
    this.data.push(newDescription)
    const userId = JSON.parse(localStorage.getItem('currentId') || '')
    if (this.updateForm.valid) {
      this.ds.editEvent(userId, this.data)
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
  cancelUpdate() {
    location.reload()
  }


}
