import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../service/events.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] = [];
  groupedEvents: any[][] = [];
  registeredEventTitles: Set<string> = new Set();

  constructor(
    private eventService: EventsService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      this.groupedEvents = this.chunkArray(this.events, 4);

      const loggedUser = sessionStorage.getItem('loggedUser');
      if (loggedUser) {
        this.loadUserRegistrations(loggedUser);
      }
    });
  }

  chunkArray(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  loadUserRegistrations(email: string): void {
    this.http.get<any[]>(`http://localhost:8080/userRegistrations/${email}`).subscribe(
      registrations => {
        this.registeredEventTitles = new Set(registrations.map(reg => reg.eventTitle));
      },
      error => {
        console.error('Error fetching user registrations', error);
      }
    );
  }

  registerEvent(event: any, formData: any): void {
    const name = formData.name;
    const email = formData.email;
    const phone = formData.mobile;  // Use phone from formData (from the popup)
  
    // Check if the user has already registered for this event
    this.http.get('http://localhost:8080/checkRegistration', {
      params: {
        email: email,
        eventTitle: event.title
      }
    }).subscribe((data: any) => {
      if (data.alreadyRegistered) {
        Swal.fire({
          icon: 'warning',
          title: 'Already Registered',
          text: 'You are already registered for this event!',
          confirmButtonText: 'OK'
        });
        return;
      } else {
        // Proceed with registration
        const registrationData = {
          name: name,
          email: email,
          phone: phone,  // Pass the phone from formData
          eventTitle: event.title,
          date: event.date,
          timing: event.timing,
          description: event.description,
          imageUrl: event.imageUrl,
          speaker: event.speaker,
          meetingUrl: event.meetingUrl
        };
  
        this.http.post('http://localhost:8080/eventregister', registrationData)
          .subscribe(
            response => {
              console.log('Registered successfully', response);
              this.registeredEventTitles.add(event.title);
              Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have registered for: ' + event.title,
                confirmButtonText: 'Great!'
              });
            },
            error => {
              console.error('Registration failed', error);
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Event registration failed. Please try again later.',
                confirmButtonText: 'Retry'
              });
            }
          );
      }
    }, error => {
      console.error('Error checking registration', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while checking your registration status.',
        confirmButtonText: 'OK'
      });
    });
  }
  

  showRegisterPopup(event: any): void {
    const loggedUserEmail = sessionStorage.getItem('loggedUser');
    
    if (!loggedUserEmail) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to register for this event.',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }
  
    // Fetch user details (name and mobile) via the API
    this.http.get<any>(`http://localhost:8080/userRegistrations/${loggedUserEmail}`).subscribe(
      user => {
        const username = user.name || '';
        const email = user.email || loggedUserEmail;  // Using email from sessionStorage if not provided in the response
        const phone = user.phone || '';
        
        // Show the registration popup with user details
        Swal.fire({
          title: 'Enter Your Details',
          html: `
            <input id="swal-username" class="swal2-input" placeholder="Username" value="${username}">
            <input id="swal-email" type="email" class="swal2-input" placeholder="Email" value="${email}" disabled>
            <input id="swal-mobile" type="text" class="swal2-input" placeholder="Mobile Number" value="${phone}">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Register',
          preConfirm: () => {
            const uname = (document.getElementById('swal-username') as HTMLInputElement).value.trim();
            const uemail = (document.getElementById('swal-email') as HTMLInputElement).value.trim();
            const umobile = (document.getElementById('swal-mobile') as HTMLInputElement).value.trim();
  
            if (!uname || !uemail || !umobile) {
              Swal.showValidationMessage('All fields are required');
              return;
            }
  
            return { name: uname, email: uemail, mobile: umobile };
          }
        }).then(result => {
          if (result.isConfirmed && result.value) {
            const formData = result.value;
            this.registerEvent(event, formData);
          }
        });
      },
      error => {
        console.error('Error fetching user details', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error retrieving your details. Please try again later.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  
  
  isRegistered(eventTitle: string): boolean {
    return this.registeredEventTitles.has(eventTitle);
  }

}
