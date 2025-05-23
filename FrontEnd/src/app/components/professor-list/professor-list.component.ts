import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { ProfessorService } from '../../service/professor.service';
import { Professor } from '../../models/professor';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor-list',
  standalone: false,
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.css'
})
export class ProfessorListComponent {

  professors: Professor[] = [];
  filteredProfessors: Professor[] = [];
  paginatedProfessors: Professor[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pages: number[] = [];

  sortColumn: keyof Professor | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private professorService: ProfessorService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProfessors();
  }

  fetchProfessors(): void {
    this.professorService.getProfessorList().subscribe({
      next: (data: Professor[]) => {
        this.professors = data;
        this.filteredProfessors = [...this.professors];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching professors:', err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProfessors = this.professors.filter(professor =>
      professor.professorname.toLowerCase().includes(term) ||
      professor.email.toLowerCase().includes(term) ||
      professor.department.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProfessors.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProfessors = this.filteredProfessors.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  sortBy(column: keyof Professor): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredProfessors.sort((a, b) => {
      const valA = (a[column] ?? '').toString().toLowerCase();
      const valB = (b[column] ?? '').toString().toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  deleteProfessor(professorId: string) {
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
          .catch(error => {
            Swal.showValidationMessage('Invalid password or server error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/deleteProfessorById/${professorId}`, { responseType: 'text' })
          .subscribe({
            next: (response) => {
              Swal.fire('Deleted!', response, 'success');
              this.fetchProfessors(); // ✅ refresh the list
            },
            error: (err) => {
              console.error("Error while deleting:", err);
              Swal.fire('Error', 'Failed to delete professor.', 'error');
            }
          });
      }
    });
  }   
}
