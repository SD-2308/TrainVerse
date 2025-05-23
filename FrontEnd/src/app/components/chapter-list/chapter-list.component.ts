import { Component } from '@angular/core';
import { Chapter } from '../../models/chapter';
import { ProfessorService } from '../../service/professor.service';

@Component({
  selector: 'app-chapter-list',
  standalone: false,
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.css'
})
export class ChapterListComponent {

  
      courses: Chapter[] = [];
      filteredCourses: Chapter[] = [];
      paginatedCourses: Chapter[] = [];
    
      searchTerm: string = '';
      currentPage: number = 1;
      pageSize: number = 10;
      totalPages: number = 0;
      pages: number[] = [];
    
      sortColumn: keyof Chapter | '' = '';
      sortDirection: 'asc' | 'desc' = 'asc';
    
      constructor(private courseService: ProfessorService) {}
    
      ngOnInit(): void {
        this.fetchCourses();
      }
    
      fetchCourses(): void {
        this.courseService.getAllChapters().subscribe({
          next: (data: Chapter[]) => {
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
          course.coursename.toLowerCase().includes(term)
          // course.courseid.toLowerCase().includes(term)
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
    
      sortBy(column: keyof Chapter): void {
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
    
  

}
