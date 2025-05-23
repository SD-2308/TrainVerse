import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Chapter } from '../../models/chapter';
import { ProfessorService } from '../../service/professor.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Course {
  courseid: string;
  coursename: string;
}

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css'],
  standalone: false
})
export class EditChapterComponent implements OnInit {

  // Courses array to hold the list of courses fetched from the service
  courses: Course[] = [];

  // Initializing the chapter object
  chapter: Chapter = {
    coursename: '',
    courseid: '',
    chapter1name: '', chapter1id: '', chapter1description: '', chapter1videoname: '', chapter1videourl: '', chapter1documentname: '', chapter1documenturl: '',
    chapter2name: '', chapter2id: '', chapter2description: '', chapter2videoname: '', chapter2videourl: '', chapter2documentname: '', chapter2documenturl: '',
    chapter3name: '', chapter3id: '', chapter3description: '', chapter3videoname: '', chapter3videourl: '', chapter3documentname: '', chapter3documenturl: '',
    chapter4name: '', chapter4id: '', chapter4description: '', chapter4videoname: '', chapter4videourl: '', chapter4documentname: '', chapter4documenturl: '',
    chapter5name: '', chapter5id: '', chapter5description: '', chapter5videoname: '', chapter5videourl: '', chapter5documentname: '', chapter5documenturl: ''
  };

  constructor(
    private chapterService: ProfessorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseid = this.route.snapshot.paramMap.get('id');

    if (courseid) {
      this.chapterService.getChapterByCourseId(courseid).subscribe({
        next: (data: Chapter[]) => {
          this.chapter = data[0]; // Take the first (and only) item
        },
        error: (err) => {
          console.error('Error loading chapter:', err);
          Swal.fire('Error', 'Could not load chapter data.', 'error');
        }
      });      
    } else {
      Swal.fire('Error', 'Course ID not found in URL.', 'error');
    }

    this.fetchCourses();
  }

  // Fetch all available courses
  fetchCourses(): void {
    this.chapterService.getAllCourse().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        Swal.fire('Error', 'Unable to load courses.', 'error');
      }
    });
  }

  // Called when a course ID is selected
  onCourseIdChange(selectedCourseId: string): void {
    const matched = this.courses.find(c => c.courseid === selectedCourseId);
    if (matched) {
      this.chapter.courseid = matched.courseid;
      this.chapter.coursename = matched.coursename;
    }
  }

  // Called when a course name is selected
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
      Swal.fire('Warning', 'Please select both Course ID and Course Name.', 'warning');
      return;
    }

    this.chapterService.updateChapter(this.chapter.courseid, this.chapter).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Chapter data saved successfully!', 'success');
        this.router.navigate(['/Chapter_List'])
      },
      error: (err) => {
        console.error('Error saving chapter:', err);
        Swal.fire('Error', 'Failed to save chapter data.', 'error');
      }
    });
  }

}
