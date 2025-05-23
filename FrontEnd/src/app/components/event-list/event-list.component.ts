import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { EventsService } from '../../service/events.service';
import { Event } from '../../models/event';


@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {

  events: Event[] = [];
  filteredEvents: Event[] = [];
  paginatedEvents: Event[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];

  sortColumn: keyof Event | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private eventsService: EventsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.filteredEvents = [...this.events];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(term)
      // event.speaker.toLowerCase().includes(term) ||
      // event.date.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  sortBy(column: keyof Event): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredEvents.sort((a, b) => {
      const valA = (a[column] ?? '').toString().toLowerCase();
      const valB = (b[column] ?? '').toString().toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  deleteEvent(id: number): void {
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
        this.http.delete(`http://localhost:8080/deleteevent/${id}`, { responseType: 'text' })
          .subscribe({
            next: (response) => {
              Swal.fire('Deleted!', response, 'success');
              this.fetchEvents(); // Refresh event list
            },
            error: (err) => {
              console.error("Error while deleting event:", err);
              Swal.fire('Error', 'Failed to delete event.', 'error');
            }
          });
      }
    });
  }

}
