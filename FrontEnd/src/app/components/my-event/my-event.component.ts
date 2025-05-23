import { Component } from '@angular/core';
import { EventsService } from '../../service/events.service';
import { Router } from '@angular/router';
import { EventRegistration } from '../../models/eventregistration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-event',
  standalone: false,
  templateUrl: './my-event.component.html',
  styleUrl: './my-event.component.css'
})
export class MyEventComponent {

  myenrollments : Observable<EventRegistration[]> | undefined;
  loggedUser = '';
  currRole = '';

  constructor(private _service : EventsService, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    this.myenrollments = this._service.getEventEnrollmentByEmail(this.loggedUser,this.currRole);
  }

}
