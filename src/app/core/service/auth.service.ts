import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

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
}
