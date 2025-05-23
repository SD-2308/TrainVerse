import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { Course } from '../../models/course';
import { ProfessorService } from '../../service/professor.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-list',
  standalone: false,
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  paginatedCourses: Course[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];

  sortColumn: keyof Course | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private courseService: ProfessorService,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.courseService.getAllCourse().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        this.filteredCourses = [...this.courses];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCourses = this.courses.filter(course =>
      course.coursename.toLowerCase().includes(term) ||
      course.instructorname.toLowerCase().includes(term) ||
      course.department.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCourses = this.filteredCourses.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  sortBy(column: keyof Course): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredCourses.sort((a, b) => {
      const valA = (a[column] ?? '').toString().toLowerCase();
      const valB = (b[column] ?? '').toString().toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  deleteCourse(courseId: string): void {
    Swal.fire({
      title: 'Admin Password Required',
      input: 'password',
      inputLabel: 'Enter Admin Password to confirm',
      inputPlaceholder: 'Admin password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Verify & Delete',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return this.http.post<{ valid: boolean }>('http://localhost:8080/verify-admin-password', { password })
          .toPromise()
          .then(response => {
            if (!response || !response.valid) {
              throw new Error('Invalid password');
            }
            return true;
          })
          .catch(() => {
            Swal.showValidationMessage('Invalid password or server error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/deleteCourseById/${courseId}`, { responseType: 'text' })
          .subscribe({
            next: (response) => {
              Swal.fire('Deleted!', response, 'success');
              this.fetchCourses(); // Refresh course list
            },
            error: (err) => {
              console.error("Error while deleting:", err);
              Swal.fire('Error', 'Failed to delete course.', 'error');
            }
          });
      }
    });
  }

}
