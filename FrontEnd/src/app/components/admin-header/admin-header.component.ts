import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorService } from '../../service/professor.service';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router, private professorService: ProfessorService) {}

  loggedUser: string = '';
  currRole: string = '';
  pageTitle: string = 'StudyPortal';
  professorStatus: string = '';

  ngOnInit(): void {
    this.loggedUser = (sessionStorage.getItem('loggedUser') || '').replace(/"/g, '');
    this.currRole = (sessionStorage.getItem('ROLE') || '').replace(/"/g, '').toLowerCase().trim();
    
    console.log('Logged User:', this.loggedUser); // Add log to verify logged-in user
    console.log('Current Role:', this.currRole); // Add log to verify current role
  
    const email = this.loggedUser;
    if (this.currRole === 'professor' && email) {
      console.log('Fetching professor details for email:', email); // Add log to verify email being sent to the service
      this.professorService.getProfessorListByEmail(email).subscribe(
        (response) => {
          if (response && response.length > 0) {
            const professor = response[0];  // Access the first element of the array
            this.professorStatus = professor?.status?.toLowerCase().trim() || '';  // Access status
            console.log("Professor status:", this.professorStatus);
          } else {
            console.warn('No professor data found');
          }
        },
        (error) => {
          console.error('Error fetching professor status:', error);
        }
      );           
    }
  }
  

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

  setTitleBasedOnRole() {
    if (this.currRole === 'admin') {
      this.pageTitle = 'Admin Portal';
    } else if (this.currRole === 'professor') {
      this.pageTitle = 'Professor Portal';
    }
  }
}
