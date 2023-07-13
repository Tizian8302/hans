import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminLoginComponent {
  username!: string;
  password!: string;

  constructor(private router: Router, 
    private authService: AuthService,
    private _matSnackBar: MatSnackBar) {}

  login(): void {
    
    if (this.authService.adminLogin(this.username, this.password)) {
      this.router.navigate(['/orders']);
    } else {
      this._matSnackBar.open("Dieses Passwort ist nicht korrekt!", "X", {
        duration: 5000
      })
    }
  }
}
