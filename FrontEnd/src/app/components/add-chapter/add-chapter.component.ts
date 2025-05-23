import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../service/professor.service';
import Swal from 'sweetalert2';
import { Chapter } from '../../models/chapter';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface Course {
  courseid: string;
  coursename: string;
}

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css'],
  standalone: false
})
export class AddChapterComponent implements OnInit {

  // Courses array to hold the list of courses fetched from the service
  courses: Course[] = [];

  // Initializing the chapter object with individual chapter fields
  chapter: Chapter = {
    coursename: '',
    courseid: '',
    chapter1name: '',
    chapter1id: '',
    chapter1description: '',
    chapter1videoname: '',
    chapter1videourl: '',
    chapter1documentname: '',
    chapter1documenturl: '',
    
    chapter2name: '',
    chapter2id: '',
    chapter2description: '',
    chapter2videoname: '',
    chapter2videourl: '',
    chapter2documentname: '',
    chapter2documenturl: '',
    
    chapter3name: '',
    chapter3id: '',
    chapter3description: '',
    chapter3videoname: '',
    chapter3videourl: '',
    chapter3documentname: '',
    chapter3documenturl: '',
    
    chapter4name: '',
    chapter4id: '',
    chapter4description: '',
    chapter4videoname: '',
    chapter4videourl: '',
    chapter4documentname: '',
    chapter4documenturl: '',
    
    chapter5name: '',
    chapter5id: '',
    chapter5description: '',
    chapter5videoname: '',
    chapter5videourl: '',
    chapter5documentname: '',
    chapter5documenturl: ''
  };

  constructor(private chapterService: ProfessorService,private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses(); // Fetching the courses on initialization
  }

  // Method to fetch all courses
  fetchCourses(): void {
    this.chapterService.getAllCourse().subscribe({
      next: (data: Course[]) => {
        this.courses = data; // Store the fetched courses
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        Swal.fire('Error', 'Unable to load courses.', 'error'); // Error alert
      }
    });
  }

  // Method called when a course ID is selected
  onCourseIdChange(selectedCourseId: string): void {
    const matched = this.courses.find(c => c.courseid === selectedCourseId);
    if (matched) {
      this.chapter.courseid = matched.courseid;
      this.chapter.coursename = matched.coursename;
    }
  }

  // Method called when a course name is selected
  onCourseNameChange(selectedCourseName: string): void {
    const matched = this.courses.find(c => c.coursename === selectedCourseName);
    if (matched) {
      this.chapter.courseid = matched.courseid;
      this.chapter.coursename = matched.coursename;
    }
  }

  // Submit method to save chapter data
  onSubmit(): void {
    if (!this.chapter.courseid || !this.chapter.coursename) {
      Swal.fire('Warning', 'Please select both Course ID and Course Name.', 'warning'); // Show warning if course details are missing
      return;
    }

    // Make the API call to save the chapter data
    this.chapterService.addNewChapters(this.chapter).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Chapter data saved successfully!', 'success'); // Success alert
        this.router.navigate(['/Chapter_List'])
      },
      error: (err) => {
        console.error('Error saving chapter', err);
        Swal.fire('Error', 'Failed to save chapter data.', 'error'); // Error alert
      }
    });
  }
}
