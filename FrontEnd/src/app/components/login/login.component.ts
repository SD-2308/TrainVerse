import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Professor } from '../../models/professor';

import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = new User();
  professor = new Professor();
  msg = "";
  adminEmail = "";
  adminPassword = "";
  activeTab: 'user' | 'professor' | 'admin' = 'user';

  constructor(private _service: LoginService, private _router: Router) {}

  ngOnInit(): void {
    // No jQuery needed
  }

  switchTab(tab: 'user' | 'professor' | 'admin') {
    this.activeTab = tab;
    this.msg = ""; // Clear error message
  }

  loginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data: any) => {
        this.setSessionStorage('user', this.user.email, 'user');
        // alert("Hello")
        this._router.navigate(['/Student_Dashboard']);
      },
      (error) => {
        console.error(error.error);
        this.msg = "Bad credentials, please enter valid credentials !!!";
      }
    );
  }

  loginProfessor() {
    this._service.loginProfessorFromRemote(this.professor).subscribe(
      (data: any) => {
        this.setSessionStorage('professor', this.professor.email, 'professor');
        this._router.navigate(['/Approval']);
      },
      (error) => {
        console.error(error.error);
        this.msg = "Bad credentials, please enter valid credentials !!!";
      }
    );
  }

  adminLogin() {
    if (this._service.adminLoginFromRemote(this.adminEmail, this.adminPassword)) {
      this.setSessionStorage('admin', this.adminEmail, 'admin');
      this._router.navigate(['/Admin_Dashboard']);
    } else {
      console.error("Admin login failed");
      this.msg = 'Bad admin credentials !!!';
    }
  }

  private setSessionStorage(userType: string, email: string, role: string) {
    sessionStorage.clear();
    sessionStorage.setItem('loggedUser', email);
    sessionStorage.setItem('USER', userType);
    sessionStorage.setItem('ROLE', role);
    sessionStorage.setItem('name', email);
  }
}