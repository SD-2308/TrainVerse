import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../service/professor.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contact = {
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  };

  isSubmitting = false;
  courses: Course[] = [];

  constructor(
    private professorService: ProfessorService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.professorService.getAllCourse().subscribe((courses: Course[]) => {
      this.courses = courses;
      console.log(this.courses);
    });
  }

  submitContact(form: NgForm) {
    if (form.invalid) return;
  
    this.isSubmitting = true;
  
    this.http.post('http://localhost:8080/api/contact', this.contact).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been sent successfully!',
          confirmButtonColor: '#3498db'
        });
        form.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#e74c3c'
        });
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }
  

  allowOnlyNumbers(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/[0-9]/.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyLetters(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-Z ]$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}