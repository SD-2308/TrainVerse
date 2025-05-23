import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../service/admin.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { Enrollment } from '../../models/enrollment';
import { EventRegistration } from '../../models/eventregistration';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: false,
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {

  
  profileDetails : Observable<User[]> | undefined;
  user: User = new User;
  msg = ' ';
  currRole = '';
  loggedUser = '';
  temp = false;

  myeventenrollments: Observable<EventRegistration[]> | undefined;
  myenrollments: Observable<Enrollment[]> | undefined;
  enrollmentCount: number = 0;
  eventCount: number = 0;

  constructor(private _service: UserService, private activatedRoute: ActivatedRoute, private _router : Router, private _eveservice: EventsService,) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');


    this.getProfileDetails(this.loggedUser);
    // Fetch the enrollments
    this.myenrollments = this._service.getEnrollmentByEmail(this.loggedUser, this.currRole);

    // Subscribe to the Observable to count the enrollments
    this.myenrollments?.subscribe(enrollments => {
      this.enrollmentCount = enrollments.length;  // Get the count of the array
    });

    this.myeventenrollments = this._eveservice.getEventEnrollmentByEmail(this.loggedUser, this.currRole);

    // Subscribe to the Observable to get and count the events
    this.myeventenrollments?.subscribe(events => {
      this.eventCount = events.length;  // Get the count of events
    });
  }


  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
  }

  


}
