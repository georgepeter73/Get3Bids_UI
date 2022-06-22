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
    const user = this.getUser();
    if(user)
      return this.tokenExpired(user)
    return true;
  }
  getUserFullName(){
    const user = this.getUser()
    if(user){
      return (JSON.parse(atob(user.split('.')[1]))).given_name +" "+
      (JSON.parse(atob(user.split('.')[1]))).family_name;
    }
    return '';
  }
  getUserEmail(){
    const user = this.getUser()
    if(user){
      return (JSON.parse(atob(user.split('.')[1])).email);
    }
   return ''
  }
  getGroups(): string[]{
    const t = jwt_decode(this.getUser())
    return t['cognito:groups'];
  }
  isMLO(){
    if (this.getGroups() && this.getGroups().filter(g => g == 'mlo') && this.getGroups().filter(g => g == 'mlo').length>0) {
      return true;
    }else{
      return false;
    }
  }
  isAdmin(){
     if (this.getGroups() && this.getGroups().filter(g => g == 'admin') && this.getGroups().filter(g => g == 'admin').length>0) {
      return true;
    }else{
      return false;
    }
  }
  isLockDesk(){
    if (this.getGroups() && this.getGroups().filter(g => g == 'lockdesk') && this.getGroups().filter(g => g == 'lockdesk').length>0) {
      return true;
    }else{
      return false;
    }
  }
  isLockDeskOrMLO(){
    if(this.isLockDesk() || this.isMLO()){
      return true;
    }
    return false;
  }

}
