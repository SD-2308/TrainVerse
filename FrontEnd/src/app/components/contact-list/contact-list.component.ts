import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  standalone: false
})
export class ContactListComponent {

  contacts: any[] = [];
  filteredContacts: any[] = [];
  paginatedContacts: any[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.isLoading = true;

    this.http.get<any[]>('http://localhost:8080/api/contact').subscribe({
      next: (data) => {
        this.contacts = data;
        this.filteredContacts = [...this.contacts];
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load Contacts',
          text: 'Something went wrong while fetching the data.',
          confirmButtonColor: '#e74c3c'
        });
        console.error('Error fetching contacts:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term) ||
      contact.location.toLowerCase().includes(term) ||
      contact.message.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredContacts.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedContacts = this.filteredContacts.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredContacts.sort((a, b) => {
      const valA = (a[column] ?? '').toString().toLowerCase();
      const valB = (b[column] ?? '').toString().toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }
}
