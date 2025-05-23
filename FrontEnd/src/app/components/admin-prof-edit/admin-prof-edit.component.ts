import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Professor } from '../../models/professor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-prof-edit',
  templateUrl: './admin-prof-edit.component.html',
  styleUrls: ['./admin-prof-edit.component.css'],
  standalone: false
})
export class AdminProfEditComponent implements OnInit {
  professorId: string = '';
  professor: Professor = {
    email: '',
    professorname: '',
    professorid: '',
    degreecompleted: '',
    institutionname: '',
    department: '',
    experience: '',
    mobile: '',
    gender: '',
    password: '',
    status: ''
  };
  originalProfessor: Professor = { ...this.professor };
  loading: boolean = true;
  saving: boolean = false;
  error: string | null = null;
  success: boolean = false;
  
  // Base API URL - change this to match your actual backend URL
  private apiBaseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('AdminProfEditComponent initialized');
    
    // Get professor ID from route params
    this.route.paramMap.subscribe(params => {
      this.professorId = params.get('id') || '';
      console.log('Professor ID from route paramMap:', this.professorId);
      
      if (this.professorId) {
        this.loadProfessorData();
      } else {
        // If not found in paramMap, try with params
        this.route.params.subscribe(routeParams => {
          this.professorId = routeParams['id'];
          console.log('Professor ID from route.params:', this.professorId);
          
          if (this.professorId) {
            this.loadProfessorData();
          } else {
            this.error = 'Professor ID not found in URL';
            this.loading = false;
          }
        });
      }
    });
  }

  loadProfessorData(): void {
    this.loading = true;
    this.error = null;
    
    console.log(`Attempting to fetch professor data with ID: ${this.professorId}`);
    
    // Add headers for debugging
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    
    // Check if we have a valid ID before making the request
    if (!this.professorId) {
      this.error = 'Professor ID is missing. Please check the URL.';
      this.loading = false;
      return;
    }
    
    const url = `${this.apiBaseUrl}/getProfessorById/${this.professorId}`;
    console.log('Making API request to:', url);
    
    this.http.get<Professor>(url, { headers })
      .pipe(
        finalize(() => {
          this.loading = false;
          console.log('Request completed, loading state set to false');
        })
      )
      .subscribe({
        next: (data) => {
          console.log('API response received:', data);
          if (data) {
            this.professor = data;
            this.originalProfessor = { ...data };
            console.log('Professor data loaded successfully:', this.professor);
          } else {
            this.error = 'No professor data returned from server.';
            console.error('Empty response received from server');
          }
        },
        error: (err) => {
          console.error('Error fetching professor data:', err);
          
          // More detailed error message based on the error status
          if (err.status === 404) {
            this.error = `Professor with ID ${this.professorId} not found.`;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to the server. Please check if the backend is running.';
          } else if (err.status === 403) {
            this.error = 'Access forbidden. You may not have permission to view this professor.';
          } else if (err.status === 500) {
            this.error = 'Server error occurred. Please contact the administrator.';
          } else {
            this.error = `Failed to load professor data: ${err.message || 'Unknown error'}`;
          }
        }
      });
      
    // Alternative approach - for testing purposes
    // Uncomment this to test if the component works with mock data
    /*
    console.log('USING MOCK DATA FOR TESTING');
    setTimeout(() => {
      const mockData: Professor = {
        email: 'prof@example.com',
        professorname: 'John Doe',
        professorid: this.professorId,
        degreecompleted: 'PhD',
        institutionname: 'Example University',
        department: 'Computer Science',
        experience: '10',
        mobile: '1234567890',
        gender: 'Male',
        password: 'password123',
        status: 'Active'
      };
      this.professor = mockData;
      this.originalProfessor = { ...mockData };
      this.loading = false;
      console.log('Mock data loaded:', this.professor);
    }, 1000);
    */
  }

  onSubmit(): void {
    this.saving = true;
    this.error = null;
    this.success = false;
  
    const url = `${this.apiBaseUrl}/updateProfessor/${this.professorId}`;
    console.log('Making PUT request to:', url);
  
    this.http.put<Professor>(url, this.professor)
      .pipe(
        finalize(() => {
          this.saving = false;
          console.log('Update request completed');
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Professor updated successfully:', response);
          this.success = true;
          this.professor = response;
          this.originalProfessor = { ...response };
  
          // Show SweetAlert2 and navigate after it closes
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Professor details updated successfully.',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/Professor_List']);
          });
        },
        error: (err) => {
          console.error('Error updating professor:', err);
  
          if (err.status === 404) {
            this.error = `Professor with ID ${this.professorId} not found.`;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to the server. Please check if the backend is running.';
          } else if (err.status === 400) {
            this.error = 'Invalid data submitted. Please check all fields.';
          } else if (err.status === 403) {
            this.error = 'Access forbidden. You may not have permission to update this professor.';
          } else {
            this.error = `Failed to update professor data: ${err.message || 'Unknown error'}`;
          }
  
          // Show error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: this.error
          });
        }
      });
  }
  
  
  resetForm(): void {
    this.professor = { ...this.originalProfessor };
    this.error = null;
    this.success = false;
  
    // Show SweetAlert2 confirmation
    Swal.fire({
      icon: 'info',
      title: 'Form Reset',
      text: 'Professor details have been reset to original values.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }
  

  goBack(): void {
    this.router.navigate(['/Professor_List']);
  }
}