import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Enrollment } from '../../models/enrollment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-course',
  standalone: false,
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent {

  myenrollments : Observable<Enrollment[]> | undefined;
  loggedUser = '';
  currRole = '';

  constructor(private _service : UserService, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    this.myenrollments = this._service.getEnrollmentByEmail(this.loggedUser,this.currRole);
  }

}
