import { Component } from '@angular/core';
import { ProfessorService } from '../../service/professor.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  totalCourses: number = 0;
  totalUsers: number = 0;
  totalEnquiries: number = 0;
  totalProfessors: number = 0;

  private NAV_URL = environment.apiURL;

  constructor(private professorService: ProfessorService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourseCount();
    this.fetchUserCount();
    this.fetchEnquiryCount();
    this.fetchProfessorCount();
  }

  fetchCourseCount(): void {
    this.professorService.getAllCourse().subscribe(
      (courses) => this.totalCourses = courses.length,
      (error) => console.error('Error fetching courses', error)
    );
  }

  fetchUserCount(): void {
    this.http.get<any[]>(`${this.NAV_URL}/userlist`).subscribe(
      (users) => this.totalUsers = users.length,
      (error) => console.error('Error fetching users', error)
    );
  }

  fetchEnquiryCount(): void {
    this.http.get<any[]>(`http://localhost:8080/api/contact`).subscribe(
      (enquiries) => this.totalEnquiries = enquiries.length,
      (error) => console.error('Error fetching enquiries', error)
    );
  }

  fetchProfessorCount(): void {
    this.professorService.getProfessorList().subscribe(
      (professors) => this.totalProfessors = professors.length,
      (error) => console.error('Error fetching professors', error)
    );
  }

}
