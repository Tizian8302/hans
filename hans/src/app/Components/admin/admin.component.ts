import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminLoginComponent {
  username!: string;
  password!: string;
  loginFailed!: boolean;

  constructor(private router: Router) {}

  login(): void {
    if (this.username === 'admin' && this.password === 'AdminHans8302') {
      this.router.navigate(['/orders']);
    } else {
      this.loginFailed = true;
    }
  }
}
