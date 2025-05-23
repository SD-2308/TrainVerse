import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: false,
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  
  constructor(private router: Router){}

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
