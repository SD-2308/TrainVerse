import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private profileService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    
    if (userId) {
      this.profileService.getProfileById(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Failed to fetch user:', err);
          Swal.fire('Error', 'Failed to fetch user data', 'error'); // SweetAlert2 on error
        }
      });
    } else {
      console.error('User ID not found in route.');
    }
  }

  onUpdate() {
    this.profileService.UpdateUserProfile(this.user).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Profile Updated Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/My_Profile']);
        });
      },
      error: (error) => {
        console.error('Failed to update profile:', error);
        Swal.fire('Error', 'Failed to Update Profile', 'error'); // SweetAlert2 on error
      }
    });
  }
}
