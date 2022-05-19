import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm = this.fb.group({
    loginId: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder, private ds:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    let userId = this.registerForm.value.loginId
    let password = this.registerForm.value.password
    if (this.registerForm.valid) {
      this.ds.login(userId, password)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('currentId',JSON.stringify(result.currentId))
            localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
            localStorage.setItem('token',JSON.stringify(result.token))
            alert(result.message)
            this.router.navigateByUrl('dashboard')
          }
        },
          (result:any) => {
            alert(result.error.message)
          }
        )
  
    }
    else {
      alert('invalid form')
    }
  }
}
