import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // Check if user session data exists
  hasUserSession(): boolean {
    return !!sessionStorage.getItem('loggedUser') && 
           sessionStorage.getItem('ROLE') === 'user';
  }

  hasAdminSession(): boolean {
    return !!sessionStorage.getItem('loggedUser') && 
           sessionStorage.getItem('ROLE') === 'admin';
  }

  hasProSession(): boolean {
    return !!sessionStorage.getItem('loggedUser') && 
           sessionStorage.getItem('ROLE') === 'professor';
  }

  // Alternative: More specific check
  hasCompleteUserSession(): boolean {
    return !!sessionStorage.getItem('loggedUser') &&
           !!sessionStorage.getItem('ROLE') &&
           !!sessionStorage.getItem('USER') &&
           sessionStorage.getItem('ROLE') === 'user';
  }
}
