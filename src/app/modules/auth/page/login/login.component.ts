import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@app/service/auth.service";
import {
  onAuthUIStateChange,
  AuthState,
  CognitoUserInterface
} from "@aws-amplify/ui-components";
import * as userActions from '../../../../app-state/actions';
import {User} from '../../../../app-state/entity';
import { Store } from '@ngrx/store';
import {GlobalService} from '@app/service/global.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  error: string;
  isLoading: boolean;
  loginForm: FormGroup;
  private returnUrl: string;
  authState!: AuthState;
  user: CognitoUserInterface | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private readonly store: Store

  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/admin";
    if (await this.authService.checkAuthenticated()) {
      if(this.authService.isAdmin()){
        this.returnUrl = "/admin";
      }else if(this.authService.isMLO() || this.authService.isLockDeskOrMLO() || this.authService.isLockDeskLimited()){
        this.returnUrl = "/lockdesk";
      }
      this.store.dispatch(userActions.login({user: new User()}));
      await this.router.navigate([this.returnUrl]);
    } else {
      localStorage.clear();
    }
    onAuthUIStateChange((authState, authData) => {
      console.log(authState, authData, JSON.stringify(authData));
      this.authState = authState;
      if (authData) {
        this.user = authData as CognitoUserInterface;
        localStorage.setItem("user",this.user.username);
         localStorage.setItem(
          "idToken",
          this.user["signInUserSession"]["idToken"]["jwtToken"]
        );
        this.store.dispatch(userActions.login({user: new User()}));
        localStorage.setItem("cognitoSession", this.user["signInUserSession"]);
        if(this.authService.isAdmin()){
          this.returnUrl = "/admin";
        }else if(this.authService.isMLO() || this.authService.isLockDeskOrMLO() || this.authService.isLockDeskLimited()){
          this.returnUrl = "/lockdesk";
        }
        this.router.navigate([this.returnUrl]).then(() => {
          window.location.reload();
        });
      }
    });

  }

  get f() {
    return this.loginForm.controls;
  }


  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
}
