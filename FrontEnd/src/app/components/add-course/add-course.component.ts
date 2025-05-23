import { Component } from '@angular/core';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { ProfessorService } from '../../service/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  
  course: any = {}; // Holds form input data

  constructor(
    private route: ActivatedRoute,
    private courseService: ProfessorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onUpdate() {
    this.courseService.addCourse(this.course).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Course added successfully', 'success');
        this.router.navigate(['/Course_List']); // Adjust route as needed
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to add course', 'error');
      }
    });
  }

}
