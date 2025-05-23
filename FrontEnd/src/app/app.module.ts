import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailssComponent } from './components/course-detailss/course-detailss.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { EventsComponent } from './components/events/events.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MyCourseComponent } from './components/my-course/my-course.component';
import { MyEventComponent } from './components/my-event/my-event.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CalanderComponent } from './components/calander/calander.component';
import { ApprovalListComponent } from './components/approval-list/approval-list.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProfessorListComponent } from './components/professor-list/professor-list.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddChapterComponent } from './components/add-chapter/add-chapter.component';
import { EditChapterComponent } from './components/edit-chapter/edit-chapter.component';
import { ViewChapterComponent } from './components/view-chapter/view-chapter.component';
import { ChapterListComponent } from './components/chapter-list/chapter-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { AdminProfViewComponent } from './components/admin-prof-view/admin-prof-view.component';
import { AdminProfEditComponent } from './components/admin-prof-edit/admin-prof-edit.component';
import { AdminUserViewComponent } from './components/admin-user-view/admin-user-view.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventsComponent } from './components/add-events/add-events.component';
import { ViewEventsComponent } from './components/view-events/view-events.component';
import { EditEventsComponent } from './components/edit-events/edit-events.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    InstructorsComponent,
    CourseComponent,
    CourseDetailssComponent,
    StudentDashboardComponent,
    DashboardHeaderComponent,
    ViewCourseComponent,
    EventsComponent,
    ContactComponent,
    RegisterComponent,
    MyCourseComponent,
    MyEventComponent,
    MyProfileComponent,
    CourseContentComponent,
    EditProfileComponent,
    CalanderComponent,
    ApprovalListComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    CourseListComponent,
    UserListComponent,
    ProfessorListComponent,
    UpdateCourseComponent,
    AddCourseComponent,
    AddChapterComponent,
    EditChapterComponent,
    ViewChapterComponent,
    ChapterListComponent,
    ContactListComponent,
    ProfessorDashboardComponent,
    AdminProfViewComponent,
    AdminProfEditComponent,
    AdminUserViewComponent,
    EventListComponent,
    AddEventsComponent,
    ViewEventsComponent,
    EditEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
