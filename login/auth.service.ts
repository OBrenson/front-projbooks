import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME = 'authenticatedUser'
  PASS = "pass"
  IS_ADMIN = "isAdmin";


  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  public username: String = "";
  public password: String = "";

  constructor(private http: HttpClient) {

  }

  authenticationService(username: string, password: string) {
    return this.http.get(`http://localhost:8080/api/v1/basicauth`,
      {headers: {authorization: this.createBasicAuthToken(username, password)}});
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string, password: string, isAdmin: boolean) {
    sessionStorage.setItem(this.USER_NAME, username)
    sessionStorage.setItem(this.PASS, password)
    this.username = username
    this.password = password
    this.getLoggedInName.emit();
    sessionStorage.setItem(this.IS_ADMIN, String(isAdmin))
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME);
    this.username = "";
    this.password = "";
    this.getLoggedInName.emit();
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME)
    if (user === null) return false
    return true
  }

  isAdmin(): boolean {
    return sessionStorage.getItem(this.IS_ADMIN) === "true"
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME)
    if (user === null) return ''
    return user
  }
}
