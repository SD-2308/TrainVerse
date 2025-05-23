import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { ProfessorService } from '../../service/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'] // Corrected styleUrl to styleUrls
})
export class CourseComponent {
  courses: Course[] = [];           // All courses
  filteredCourses: Course[] = [];   // Filtered courses based on search query
  searchQuery: string = '';         // Holds the search query input

  constructor(private professorService: ProfessorService, private router: Router) {}

  ngOnInit() {
    // Fetch all courses from the professor service
    this.professorService.getAllCourse().subscribe((courses: Course[]) => {
      this.courses = courses;
      this.filteredCourses = courses;  // Initially show all courses
    });
  }

  // This method will be called every time the user types in the search bar
  searchCourses() {
    if (this.searchQuery) {
      // Filter courses based on the search query
      this.filteredCourses = this.courses.filter(course =>
        course.coursename.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructorname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.language.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // Show all courses when the search query is empty
      this.filteredCourses = this.courses;
    }
  }
}
