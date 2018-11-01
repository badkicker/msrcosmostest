import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthGaurd implements CanActivate {
  loggedin = false;
  constructor(public routingobj: Router) { }
  canActivate() {

    if (localStorage.getItem("token") !== '') {
      this.loggedin = true;
      return true;
    } else {
      this.routingobj.navigate(['/login']);
      return false;
    }
  }

}
