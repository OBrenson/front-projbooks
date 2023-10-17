import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './auth.service';
import {Message} from "../model/message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage = 'Invalid Credentials';
  successMessage: string = "";
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
    this.authenticationService.logout()
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      let isAdmin = (result as Message).message.includes("ADMIN")
      this.authenticationService.registerSuccessfulLogin(this.username, this.password, isAdmin)
      this.router.navigate(['/books']);
    })
    // () => {
    //   this.invalidLogin = true;
    //   this.loginSuccess = false;
    // });
  }
}
