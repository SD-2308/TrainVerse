import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'app-view-events',
  standalone: false,
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.css'
})
export class ViewEventsComponent {

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

  
}