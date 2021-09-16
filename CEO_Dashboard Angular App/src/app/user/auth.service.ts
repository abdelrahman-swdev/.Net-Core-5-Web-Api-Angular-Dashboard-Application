import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as constants from '../shared/constants';
import { catchError } from "rxjs/operators";
import { of, scheduled } from "rxjs";
import { IUser } from '../_models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser!:IUser;
  constructor(private http: HttpClient) {}

  getToken(values: any) {
    let loginInfo = { email: values.email, password: values.password };
    let options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${constants.apiUrl}${constants.getTokeUrl}`,
      loginInfo,
      { headers: options }
    );
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  getCurrentToken():string|null{
    return localStorage.getItem('token');
  }

  removeCurrentFromLocalStorage():void{
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserRoles');
  }

  saveCurrentUserToLocalStorage(userName:string, roles:string[]):void{
    localStorage.setItem('currentUserName',userName);
    localStorage.setItem('currentUserRoles',JSON.stringify(roles));
  }

  getCurrentUserFromLocalStorage() :IUser | null{
    let storedName = localStorage.getItem('currentUserName');
    let storedRoles = localStorage.getItem('currentUserRoles');

    if(storedName != null && storedRoles!=null){
      let user:IUser = {
        userName : storedName,
        roles : []
      };
      storedRoles = JSON.parse(storedRoles);
      if(storedRoles){
        user.roles =  Array.from(storedRoles);
      }
      return user;
    }
    return null;
  }
}
