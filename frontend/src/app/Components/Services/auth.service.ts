import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(password: string) {
    if (password == environment.password) {
      return true
    } else {
      return false
    }
  }

  adminLogin(username: any, password: any): Boolean {
    if (username === 'admin' && password === environment.adminPassword) {
      return true
    } else {
      return false
    }
  }

}
