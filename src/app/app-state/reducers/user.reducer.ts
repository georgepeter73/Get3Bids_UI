import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../entity';
import * as userActions from '../actions';
import * as storage from '../state/storage';

export interface State {
  user: User;
  result: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  test : boolean;
  msg : string;
}

export const initialState: State = {
  user: storage.getItem('user').user,
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  test : false,
  msg : '',

};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state, {user}) => ({user, isLoading: true})),
  on(userActions.loginSuccess, (state, result) => ({user: result, result, isLoading: false, isLoadingSuccess: true, test: true})),
  on(userActions.loginFailure, (state, {message}) => ( { user: null, result : null, isLoading: false, isLoadingSuccess: false, test: true, msg: 'failed'})),




);

export function reducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}

export const getLoggedInUser = (state: State) => {
  return {
    user: state.user,
    isLoadingSuccess: state.isLoadingSuccess,
    test : state.test
  }
};

export const userLogin = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess,
    test : state.test
  }
};

