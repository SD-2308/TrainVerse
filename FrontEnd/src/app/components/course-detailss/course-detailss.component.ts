import { Component } from '@angular/core';
import { ProfessorService } from '../../service/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { UserService } from '../../service/user.service';
import { Enrollment } from '../../models/enrollment';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Chapter } from '../../models/chapter';

@Component({
  selector: 'app-course-detailss',
  standalone: false,
  templateUrl: './course-detailss.component.html',
  styleUrls: ['./course-detailss.component.css']
})
export class CourseDetailssComponent {
  course: Course = new Course();
  chapterlist: any[] = []; // Will store chapters dynamically
  isEnrolled: boolean = false;
  loggedUser: string = '';
  currRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      // Fetch chapters
      this.userService.getChapterListByCourseId(courseId).subscribe(
        (data: Chapter[]) => {
          if (data.length > 0) {
            this.chapterlist = this.extractChapters(data[0]);
          }
        },
        (error) => {
          console.error('Error fetching chapter list:', error);
        }
      );

      // Fetch course details
      this.professorService.getCourseById(courseId).subscribe(
        (course: Course) => {
          this.course = course;
          this.checkEnrollmentStatus();
        },
        (error) => {
          console.error('Failed to load course:', error);
        }
      );
    }

    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';
  }
  
   // Method to generate stars for course rating
   getStars(rating: string | number | null | undefined): string[] {
    if (!rating || isNaN(Number(rating))) {
      // If rating is missing or invalid, return all empty stars
      return Array(5).fill('empty');
    }

    const stars = parseFloat(rating as string);
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('full'),
      ...(halfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }


  extractChapters(rawChapter: Chapter): any[] {
    const chapters = [];

    for (let i = 1; i <= 5; i++) {
      const name = (rawChapter as any)[`chapter${i}name`];
      if (name && name.trim() !== '') {
        chapters.push({
          id: (rawChapter as any)[`chapter${i}id`],
          name: name,
          description: (rawChapter as any)[`chapter${i}description`],
          videoName: (rawChapter as any)[`chapter${i}videoname`],
          documentName: (rawChapter as any)[`chapter${i}documentname`],
        });
      }
    }

    return chapters;
  }

  checkEnrollmentStatus(): void {
    if (!this.loggedUser || !this.currRole) return;

    this.userService.getEnrollmentStatus(this.course.courseid, this.loggedUser, this.currRole).subscribe(
      (response: any) => {
        this.isEnrolled = response === 'enrolled';
      },
      (error) => {
        console.error('Error checking enrollment status:', error);
      }
    );
  }

  buyCourse(): void {
    if (!this.loggedUser) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to enroll in this course.',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    if (this.isEnrolled) {
      Swal.fire({
        icon: 'info',
        title: 'Already Enrolled',
        text: 'You are already enrolled in this course!',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#28a745',
      });
      return;
    }

    if (this.currRole !== 'user') {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'Only users with the role "user" can enroll in courses.',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#dc3545',
    });
    return;
  }

    const enrollment = new Enrollment();
    enrollment.courseid = this.course.courseid;
    enrollment.coursename = this.course.coursename;
    enrollment.enrolleduserid = this.loggedUser;
    enrollment.enrolledusername = this.loggedUser;
    enrollment.enrolledusertype = this.currRole;
    enrollment.instructorname = this.course.instructorname;
    enrollment.instructorinstitution = this.course.instructorinstitution;
    enrollment.youtubeurl = this.course.imageUrl;
    enrollment.websiteurl = this.course.websiteurl;
    enrollment.coursetype = this.course.coursetype;
    enrollment.skilllevel = this.course.skilllevel;
    enrollment.language = this.course.language;
    enrollment.description = this.course.description;

    this.userService.enrollNewCourse(enrollment, this.loggedUser, this.currRole).subscribe(
      (response: any) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Enrollment Successful!',
            text: `You have successfully enrolled in the course: ${this.course.coursename}`,
            confirmButtonText: 'Start Learning!',
            confirmButtonColor: '#28a745',
          }).then(()=>{
            this.router.navigate(['/My_Course']);
          });
          this.isEnrolled = true;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Enrollment Failed',
            text: response.message,
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#dc3545',
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enrollment Failed',
          text: 'Please try again later.',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#dc3545',
        });
        console.error('Enrollment failed:', error);
      }
    );
  }
}
