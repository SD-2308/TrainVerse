import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../service/events.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-events',
  standalone: false,
  templateUrl: './add-events.component.html',
  styleUrl: './add-events.component.css'
})
export class AddEventsComponent implements OnInit {
  event: any = {};  // Holds form input data

  constructor(
    private eventService: EventsService,  // Event service to handle API calls
    private router: Router
  ) {}

  ngOnInit(): void {}

  onAddEvent() {
    // Call the service method to add the event
    this.eventService.addEvents(this.event).subscribe({
      next: (response) => {
        // Success message on successful event creation
        Swal.fire('Success', 'Event added successfully', 'success');
        this.router.navigate(['/Events_List']);  // Redirect to event list page
      },
      error: (err) => {
        // Handle error case
        console.error(err);
        Swal.fire('Error', 'Failed to add event', 'error');
      }
    });
  }  
}
