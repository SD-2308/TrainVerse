import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-user-view',
  standalone: false,
  templateUrl: './admin-user-view.component.html',
  styleUrl: './admin-user-view.component.css'
})
export class AdminUserViewComponent implements OnInit {
  userId: string = '';
  user: User = {
    email: '',
    username: '',
    userid: '',
    mobile: '',
    gender: '',
    profession: '',
    address: '',
    password: ''
  };
  originalUser: User = { ...this.user };
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
    console.log('AdminUserViewComponent initialized');
    
    // Get user ID from route params
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log('User ID from route paramMap:', this.userId);
      
      if (this.userId) {
        this.loadUserData();
      } else {
        // If not found in paramMap, try with params
        this.route.params.subscribe(routeParams => {
          this.userId = routeParams['id'];
          console.log('User ID from route.params:', this.userId);
          
          if (this.userId) {
            this.loadUserData();
          } else {
            this.error = 'User ID not found in URL';
            this.loading = false;
          }
        });
      }
    });
  }

  loadUserData(): void {
    this.loading = true;
    this.error = null;
    
    console.log(`Attempting to fetch user data with ID: ${this.userId}`);
    
    // Add headers for debugging
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    
    // Check if we have a valid ID before making the request
    if (!this.userId) {
      this.error = 'User ID is missing. Please check the URL.';
      this.loading = false;
      return;
    }
    
    const url = `${this.apiBaseUrl}/getUserById/${this.userId}`;
    console.log('Making API request to:', url);
    
    this.http.get<User>(url, { headers })
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
            this.user = data;
            this.originalUser = { ...data };
            console.log('User data loaded successfully:', this.user);
          } else {
            this.error = 'No user data returned from server.';
            console.error('Empty response received from server');
          }
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          
          // More detailed error message based on the error status
          if (err.status === 404) {
            this.error = `User with ID ${this.userId} not found.`;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to the server. Please check if the backend is running.';
          } else if (err.status === 403) {
            this.error = 'Access forbidden. You may not have permission to view this user.';
          } else if (err.status === 500) {
            this.error = 'Server error occurred. Please contact the administrator.';
          } else {
            this.error = `Failed to load user data: ${err.message || 'Unknown error'}`;
          }
        }
      });
      
    // Alternative approach - for testing purposes
    // Uncomment this to test if the component works with mock data
    /*
    console.log('USING MOCK DATA FOR TESTING');
    setTimeout(() => {
      const mockData: User = {
        email: 'user@example.com',
        username: 'John Doe',
        userid: this.userId,
        mobile: '1234567890',
        gender: 'Male',
        profession: 'Software Engineer',
        address: '123 Main St, Anytown, AB 12345',
        password: 'password123'
      };
      this.user = mockData;
      this.originalUser = { ...mockData };
      this.loading = false;
      console.log('Mock data loaded:', this.user);
    }, 1000);
    */
  }

  goBack(): void {
    this.router.navigate(['/User_List']);
  }
}