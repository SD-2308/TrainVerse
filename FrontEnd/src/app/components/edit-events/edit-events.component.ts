import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'app-edit-events',
  standalone: false,
  templateUrl: './edit-events.component.html',
  styleUrl: './edit-events.component.css'
})
export class EditEventsComponent {

  event: any = {}; // Holds event data
  eventId!: number;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get event ID from route
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEventData();
  }

  loadEventData() {
    this.eventService.getEventsById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to load event data', 'error');
      }
    });
  }

  onUpdateEvent() {
    this.eventService.updateEvent(this.eventId, this.event).subscribe({
      next: () => {
        Swal.fire('Success', 'Event updated successfully', 'success');
        this.router.navigate(['/Events_List']); // Adjust navigation route
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to update event', 'error');
      }
    });
  }
}
