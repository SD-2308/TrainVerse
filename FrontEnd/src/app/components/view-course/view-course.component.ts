import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../service/professor.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-view-course',
  standalone: false,
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent {

  course: any = {}; // To hold the course data
    courseId: string = ''; // To hold the course ID from the route
  
    constructor(
      private route: ActivatedRoute,
      private courseService: ProfessorService, // Assuming CourseService handles course APIs
      private router: Router
    ) {}
  
    ngOnInit(): void {
      // Retrieve courseId from the route
      this.courseId = this.route.snapshot.paramMap.get('id')!;
      
      // If courseId exists, fetch the course details
      if (this.courseId) {
        this.courseService.getCourseById(this.courseId).subscribe({
          next: (data) => {
            this.course = data;
          },
          error: (err) => {
            console.error('Failed to fetch course:', err);
            Swal.fire('Error', 'Failed to fetch course data', 'error');
          }
        });
      } else {
        console.error('Course ID not found in route.');
      }
    }
    

}
