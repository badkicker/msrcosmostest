import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class MasterService {

  token = "";
  userId: any;
  userType: any = "0";
  apiUrl = '';
  dashboardFlag = false;
  userData=[];
  constructor(
    private http: HttpClient,
    private routerObj: Router,
  ) {
    console.log(environment)
    if (environment.production) {
      this.apiUrl = environment.prodApiUrl;
    } else {
      this.apiUrl = environment.localApiUrl
    }
  }

  checkUselogin() {
    if (this.token !== null && this.token !== '' && this.token !== undefined) {
      if (this.userType === 1) {
        this.routerObj.navigate(['/dashboard']);
      } else if (this.userType === 2) {
        this.routerObj.navigate(['']);
      } else {
        this.routerObj.navigate(['/login']);
      }
    } else {
      this.routerObj.navigate(['/login']);
    }
  }
  postuserLogin(options) {
    return this.http.post(this.apiUrl + '/v1/login', options);
  }
  postRegistration(options) {
    return this.http.post(this.apiUrl + '/v1/userregister', options)
  }
  postBook(options) {
    return this.http.post(this.apiUrl + '/v1/postbook', options)
  }
  putBook(options) {
    return this.http.put(this.apiUrl + '/v1/putbook', options)
  }

  getBooks() {
    return this.http.get(this.apiUrl + '/v1/getbooks')
  }
  getUsers() {
    return this.http.get(this.apiUrl + '/v1/userdata')
  }
  deletebook(options){
    return this.http.delete(this.apiUrl + '/v1/deletebook/'+ options.bookId,options)
  }
  restrictNumeric(event) {
    const pattern = /^[a-zA-Z ]+$/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 9 && event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onlyNumberKey(event) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 9 && event.keyCode != 8 && event.keyCode != 13 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  AlphaNumeric(event) {
    const pattern = /[a-zA-Z0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 9 && event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  withspace(event) {
    const pattern = /[a-zA-Z0-9 ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 9 && event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface BooksData {
  id: string;
  name: string;
  progress: string;
  color: string;
}