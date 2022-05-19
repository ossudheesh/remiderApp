import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


let options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  register(userName: any, userId: any, password: any) {
    const data = {
      userName,
      userId,
      password
    }
    return this.http.post('http://localhost:3000/register', data)

  }
  login(userId: any, password: any) {
    const data = {
      userId,
      password
    }
    return this.http.post('http://localhost:3000/login', data)
  }
  addEvent(userId: any, eventDate: any, eventDescription: any) {
    const data = {
      userId,
      eventDate,
      eventDescription
    }
    return this.http.post('http://localhost:3000/addEvent', data, this.getOptions())
  }
  removeItem(userId:any,date: any,description: any) {
    const data = {
      userId,
      date,
      description
    }
    console.log(data);
    
    return this.http.post('http://localhost:3000/removeItem', data, this.getOptions())
  }
  eventList(userId: any) {
    const data = {
      userId
    }
    return this.http.post('http://localhost:3000/eventList', data, this.getOptions())
  }
  findEvent(userId:any,date:any){
    const data={
      userId,
      date
    }
    return this.http.post('http://localhost:3000/findEvent', data, this.getOptions())
  }
  onDelete(userId: any) {
    return this.http.delete('http://localhost:3000/onDelete/' + userId, this.getOptions())
  }
  getOptions() {
    // to fetch token 
    const token = JSON.parse(localStorage.getItem('token') || '')
    // to create http header 
    let headers = new HttpHeaders()
    // add token to req header 
    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }
  
}
