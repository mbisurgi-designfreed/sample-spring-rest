import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: String = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(f: NgForm) {
    let username = f.controls.username.value;
    let password = f.controls.password.value;

    this.authService.signin(username, password)
      .subscribe((res) => {
        if (res.status == 200) {
          localStorage.setItem('token', res.headers.get('Authorization'));
          this.authService.authenticate.next(true);
          this.router.navigate(['/']);
        }
      }, (err) => {
        this.message = 'Invalid credentials. Please try again.';
      });;
  }

  onSignup(f: NgForm) {
    let username = f.controls.username.value;
    let password = f.controls.password.value;

    this.authService.signup(username, password)
      .subscribe((res) => {
        if (res.status == 200) {
          this.authService.signin(username, password)
            .subscribe((res) => {
              if (res.status == 200) {
                localStorage.setItem('token', res.headers.get('Authorization'));
                this.authService.authenticate.next(true);
                this.router.navigate(['/']);
              }
            }, (err) => {
              this.message = 'Invalid credentials. Please try again.';
            });;
        }
      }, (err) => {
        this.message = 'Username already exists. Please try another one.';
      });
  }
}