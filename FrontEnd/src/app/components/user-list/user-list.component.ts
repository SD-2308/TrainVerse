import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users: User[] = [];
    filteredUsers: User[] = [];
    paginatedUsers: User[] = [];
  
    searchTerm: string = '';
    currentPage: number = 1;
    pageSize: number = 10;
    totalPages: number = 0;
    pages: number[] = [];
  
    sortColumn: keyof User | '' = '';
    sortDirection: 'asc' | 'desc' = 'asc';
  
    constructor(private userService: UserService, private http: HttpClient) {}
  
    ngOnInit(): void {
      this.fetchUsers();
    }
  
    fetchUsers(): void {
      this.userService.getAllUsers().subscribe({
        next: (data: User[]) => {
          this.users = data;
          this.filteredUsers = [...this.users];
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }
  
    applyFilter(): void {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.profession.toLowerCase().includes(term) ||
        user.gender.toLowerCase().includes(term)
      );
      this.currentPage = 1;
      this.updatePagination();
    }
  
    updatePagination(): void {
      this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedUsers = this.filteredUsers.slice(start, end);
    }
  
    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    }
  
    sortBy(column: keyof User): void {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
  
      this.filteredUsers.sort((a, b) => {
        const valA = (a[column] ?? '').toString().toLowerCase();
        const valB = (b[column] ?? '').toString().toLowerCase();
  
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  
      this.updatePagination();
    }
  
    deleteUser(userId: string): void {
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
          this.http.delete(`http://localhost:8080/deleteUserById/${userId}`, { responseType: 'text' })
            .subscribe({
              next: (response) => {
                Swal.fire('Deleted!', response, 'success');
                this.fetchUsers(); // ✅ Refresh list after deletion
              },
              error: (err) => {
                console.error("Error deleting user:", err);
                Swal.fire('Error', 'Failed to delete user.', 'error');
              }
            });
        }
      });
    }
}
