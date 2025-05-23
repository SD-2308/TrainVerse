import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../service/professor.service';
import { Professor } from '../../models/professor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-approval-list',
  standalone: false,
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit {

  currRole = '';
  loggedUser = '';
  approval: Observable<Professor[]> | undefined;
  professorlist: Professor[] = [];
  filteredProfessors: Professor[] = [];
  pages: number[] = [];

  acceptedMap: { [email: string]: boolean } = {};
  rejectedMap: { [email: string]: boolean } = {};

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  // Search
  searchQuery = '';

  constructor(private _service: ProfessorService) { }

  ngOnInit(): void {
    this.loggedUser = (sessionStorage.getItem('loggedUser') || '').replace(/"/g, '');
    this.currRole = (sessionStorage.getItem('ROLE') || '').replace(/"/g, '').toLowerCase();

    this.loadProfessorLists();
  }

  loadProfessorLists(): void {
    this._service.getProfessorList().subscribe((data) => {
      this.professorlist = data;
      this.applyFilterAndPagination();
    });

    this.approval = this._service.getProfessorListByEmail(this.loggedUser);
  }

  applyFilterAndPagination(): void {
    const query = this.searchQuery.toLowerCase();

    // Filter based on search input
    const filtered = this.professorlist.filter(professor =>
      professor.professorname.toLowerCase().includes(query) ||
      professor.email.toLowerCase().includes(query) ||
      professor.degreecompleted.toLowerCase().includes(query)
    );

    // Sort: 'false' (pending) first, then 'accept', then 'reject'
    const order: Record<string, number> = { 'false': 0, 'accept': 1, 'reject': 2 };
    filtered.sort((a, b) => {
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

    // Pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredProfessors = filtered.slice(start, end);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilterAndPagination();
    }
  }

  rejectRequest(curremail: string) {
    this._service.rejectRequestForProfessorApproval(curremail)
      .subscribe({
        next: () => {
          this.acceptedMap[curremail] = false;
          this.rejectedMap[curremail] = true;
          this.loadProfessorLists();
        },
        error: (error) => console.error('Error rejecting professor:', error)
      });
  }

  acceptRequest(curremail: string) {
    this._service.acceptRequestForProfessorApproval(curremail)
      .subscribe({
        next: () => {
          this.acceptedMap[curremail] = true;
          this.rejectedMap[curremail] = false;
          this.loadProfessorLists();
        },
        error: (error) => console.error('Error accepting professor:', error)
      });
  }

  isProfessor(): boolean {
    return this.currRole === 'professor';
  }

  isAdmin(): boolean {
    return this.currRole === 'admin' && this.loggedUser === 'admin@gmail.com';
  }

}
