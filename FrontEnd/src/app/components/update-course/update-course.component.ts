import { Component } from '@angular/core';
import { ProfessorService } from '../../service/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-update-course',
  standalone: false,
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
  
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

  onUpdate() {
    console.log('Updated Course:', this.course); // Check the course data
    this.courseService.updateCourseById(this.courseId, this.course).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Course Updated Successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['Course_List']);
        });
      },
      error: (error) => {
        console.error('Failed to update course:', error);
        Swal.fire('Error', 'Failed to Update Course: ' + error.message, 'error');
      }
    });
  }
  
  
  
}
