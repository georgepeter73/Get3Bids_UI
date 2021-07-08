import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, AuthState, CognitoUserInterface } from '@aws-amplify/ui-components'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'loan-house-pos';
  authState!: AuthState;
  user: CognitoUserInterface | undefined;
  backendResponse : string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      localStorage.setItem("idToken", this.user["signInUserSession"]["idToken"]["jwtToken"]);
      this.router.navigate(['/dynamo']).then(() => {
        window.location.reload();
      });
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}