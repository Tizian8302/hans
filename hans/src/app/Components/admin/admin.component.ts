import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminLoginComponent {
  username!: string;
  password!: string;
  loginFailed!: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.authService.adminLogin(this.username, this.password)
    if (this.username === 'admin' && this.password === environment.adminPassword) {
      this.router.navigate(['/orders']);
    } else {
      this.loginFailed = true;
    }
  }
}
