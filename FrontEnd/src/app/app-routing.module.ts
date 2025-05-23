import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { HomeComponent } from './components/home/home.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailssComponent } from './components/course-detailss/course-detailss.component';
import { EventsComponent } from './components/events/events.component';
import { ContactComponent } from './components/contact/contact.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyCourseComponent } from './components/my-course/my-course.component';
import { MyEventComponent } from './components/my-event/my-event.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ApprovalListComponent } from './components/approval-list/approval-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProfessorListComponent } from './components/professor-list/professor-list.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddChapterComponent } from './components/add-chapter/add-chapter.component';
import { EditChapterComponent } from './components/edit-chapter/edit-chapter.component';
import { ChapterListComponent } from './components/chapter-list/chapter-list.component';
import { ViewChapterComponent } from './components/view-chapter/view-chapter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProfessorGuard } from './guards/professor.guard';
import { ApprovalGuard } from './guards/approval.guard';
import { AdminProfEditComponent } from './components/admin-prof-edit/admin-prof-edit.component';
import { AdminProfViewComponent } from './components/admin-prof-view/admin-prof-view.component';
import { AdminUserViewComponent } from './components/admin-user-view/admin-user-view.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventsComponent } from './components/add-events/add-events.component';
import { EditEventsComponent } from './components/edit-events/edit-events.component';
import { ViewEventsComponent } from './components/view-events/view-events.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"course",component:CourseComponent},
  {path:"Course_Details",component:CourseDetailssComponent},
  {path:"instructors",component:InstructorsComponent},
  {path:"events",component:EventsComponent},
  {path:"contact",component:ContactComponent},
  {path:"Student_Dashboard",component:StudentDashboardComponent, canActivate:[UserGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"My_Course",component:MyCourseComponent, canActivate:[UserGuard]},
  {path:"My_Event",component:MyEventComponent, canActivate:[UserGuard]},
  {path:"My_Profile",component:MyProfileComponent, canActivate:[UserGuard]},
  {path:"Course_Content",component:CourseContentComponent, canActivate:[UserGuard]},
  {path: 'Course_Details/:id', component: CourseDetailssComponent },
  {path: 'Course_Content/:id', component:CourseContentComponent},
  {path:'Edit_Profile/:id', component:EditProfileComponent, canActivate:[UserGuard]},
  {path:'Edit_Course/:id', component:UpdateCourseComponent, canActivate:[ApprovalGuard]},
  {path:'Approval',component:ApprovalListComponent, canActivate:[ApprovalGuard]},
  {path:"Admin_Dashboard",component: AdminDashboardComponent,canActivate:[AdminGuard]},
  {path:"Course_List", component: CourseListComponent, canActivate:[ApprovalGuard]},
  {path: "User_List", component: UserListComponent, canActivate:[ApprovalGuard]},
  {path: "Professor_List", component : ProfessorListComponent, canActivate:[AdminGuard]},
  {path: "View_Course/:id", component : ViewCourseComponent, canActivate:[ApprovalGuard]},
  {path: "View_Chapter/:id", component : ViewChapterComponent, canActivate:[ApprovalGuard]},
  {path: "Edit_Event/:id", component : EditEventsComponent, canActivate:[ApprovalGuard]},
  {path: "View_Event/:id", component : ViewEventsComponent, canActivate:[ApprovalGuard]},
  {path: "Add_Course", component: AddCourseComponent, canActivate:[ApprovalGuard]},
  {path: "Add_Chapter", component: AddChapterComponent, canActivate:[ApprovalGuard]},
  {path: "Add_Events", component: AddEventsComponent, canActivate:[ApprovalGuard]},
  {path: "Edit_Chapter/:id", component: EditChapterComponent, canActivate:[ApprovalGuard]},
  {path: "Chapter_List", component: ChapterListComponent, canActivate:[ApprovalGuard]},
  {path: "Contact_List",component: ContactListComponent, canActivate:[AdminGuard]},
  {path: "Events_List",component: EventListComponent, canActivate:[AdminGuard]},
  {path: "Professor_Dashboard", component: ProfessorDashboardComponent,canActivate:[ProfessorGuard]},
  {path:"Admin_Prof_Edit/:id",component:AdminProfEditComponent, canActivate:[ApprovalGuard]},
  {path:"Admin_Prof_View/:id",component:AdminProfViewComponent, canActivate:[ApprovalGuard]},
  {path:"Admin_User_View/:id",component:AdminUserViewComponent, canActivate:[ApprovalGuard]},
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // Scrolls to top on route change
  anchorScrolling: 'enabled',           // Optional, enables #anchor scrolling
};

@NgModule({
  imports: [RouterModule.forRoot(routes,  routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
