import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as userActions from '../actions';
import {AuthService} from '@app/service/auth.service';
import {Observable, of} from 'rxjs';
import {User} from '../entity';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      exhaustMap(action =>
        this.getUser().pipe(
          map(response => userActions.loginSuccess(response)),
          catchError((error: any) => of(userActions.loginFailure(error))))
      )

    )
  );
  getUser(): Observable<User>{
    let user = {
      email : this.authService.getUserEmail(),
      fullName : this.authService.getUserFullName(),
      groups : this.authService.getGroups(),
      isMLO : this.authService.isMLO(),
      isLockDesk : this.authService.isLockDesk(),
      isAdmin: this.authService.isAdmin()
    }
   return of(user);
  }


}
