import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: string;


  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  async checkAuthenticated() {
    const token = localStorage.getItem("idToken");
    if (token) {
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  }

  async logout(redirect: string) {
    try {
      localStorage.removeItem("idToken");
      this.isAuthenticated.next(false);
      this.router.navigate([redirect || "/auth/login"]).then(() => {
        window.location.reload();
      });
    } catch (err) {
      console.error(err);
    }
  }

  getUser() {
    return localStorage.getItem("idToken");
  }
  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  isTokenExpired(){
    return this.tokenExpired(this.getUser())
  }
  getUserFullName(){
    return (JSON.parse(atob(this.getUser().split('.')[1]))).given_name +" "+
      (JSON.parse(atob(this.getUser().split('.')[1]))).family_name;
  }
  getGroups(): string[]{
    const t = jwt_decode(this.getUser())
    return t['cognito:groups'];
  }
}
