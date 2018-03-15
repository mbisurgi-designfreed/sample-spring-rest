import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  authenticate: Boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.authenticate = true;
    }

    this.authService.authenticate.subscribe((boolean) => {
      if (boolean) {
        this.authenticate = true;
      } else {
        this.authenticate = false;
      }
    })
  }

  onLogout() {
    this.authService.logout();
    this.authService.authenticate.next(false);
    this.router.navigate(['/login']);
  }
}
