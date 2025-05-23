import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Professor } from '../../models/professor';
import { Router } from '@angular/router';
import { RegistrationService } from '../../service/registration.service';
import { ProfessorService } from '../../service/professor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = new User();
  professor = new Professor();
  msg = '';

  termsAcceptedUser: boolean = false;  // Initialize to false
  termsAcceptedProfessor: boolean = false;  // Initialize to false
  
  selectedTab: 'user' | 'professor' = 'user'; // default tab

  // confirm passwords
  confirmUserPassword: string = '';
  confirmProfessorPassword: string = '';

  // checkbox values
  userTermsAccepted: boolean = false;
  professorTermsAccepted: boolean = false;

  constructor(
    private _registrationService: RegistrationService,
    private _professorService: ProfessorService,
    private _router: Router
  ) {}

  switchTab(tab: 'user' | 'professor') {
    this.selectedTab = tab;
    this.msg = '';
  }

  getPasswordStrength(password: string): string {
    let strength = 0;

    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    if (strength === 5) return 'Strong';
    if (strength === 4) return 'Moderate';
    if (strength === 3) return 'Weak';
    return 'Very Weak';
  }

  getPasswordProgress(password: string): number {
    if (!password) return 0;

    let progress = 0;

    if (password.length >= 8) progress += 20;
    if (/[a-z]/.test(password)) progress += 20;
    if (/[A-Z]/.test(password)) progress += 20;
    if (/\d/.test(password)) progress += 20;
    if (/[@$!%*?&]/.test(password)) progress += 20;

    return progress;
  }

  registerUser() {
    if (!this.userTermsAccepted) {
      this.msg = 'Please accept Terms & Conditions to continue.';
      return;
    }

    if (this.user.password !== this.confirmUserPassword) {
      this.msg = 'Passwords do not match!';
      return;
    }

    this._registrationService.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log("User Registration Success");
        sessionStorage.setItem("username", this.user.username);
        sessionStorage.setItem("gender", this.user.gender);

        // Show SweetAlert success
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have registered successfully!',
          confirmButtonText: 'Proceed to Login',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this._router.navigate(['/login']);
        });
      },
      error => {
        console.log("User Registration Failed");
        this.msg = `User with ${this.user.email} already exists !!!`;
      }
    );
  }

  registerProfessor() {
    if (!this.professorTermsAccepted) {
      this.msg = 'Please accept Terms & Conditions to continue.';
      return;
    }

    if (this.professor.password !== this.confirmProfessorPassword) {
      this.msg = 'Passwords do not match!';
      return;
    }

    this._registrationService.registerProfessorFromRemote(this.professor).subscribe(
      data => {
        console.log("Professor Registration Success");
        sessionStorage.setItem("doctorname", this.professor.professorname);
        sessionStorage.setItem("gender", this.professor.gender);

        // Show SweetAlert success
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have registered successfully!',
          confirmButtonText: 'Proceed to Login',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this._router.navigate(['/login']);
        });
      },
      error => {
        console.log("Professor Registration Failed");
        this.msg = `Professor with ${this.professor.email} already exists !!!`;
      }
    );
  }
}
