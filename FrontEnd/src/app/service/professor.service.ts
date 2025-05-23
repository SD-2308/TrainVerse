import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Chapter } from '../models/chapter';


const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private _http : HttpClient) { }

  acceptRequestForProfessorApproval(curremail: string): Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/acceptstatus/`+curremail);
  }
  
  rejectRequestForProfessorApproval(curremail: string): Observable<any> 
  {
    return this._http.get<any>(`${NAV_URL}/rejectstatus/`+curremail);
  }
  
  getProfessorList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/professorlist`);
  }

  getYoutubeCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/youtubecourselist`);
  }

  getWebsiteCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/websitecourselist`);
  }

  getCourseListByName(coursename : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/courselistbyname/`+coursename);
  }

  addCourse(course : Course) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addCourse`,course);
  }

  // deleteCourse(courseId: string, password: string): Observable<DeleteResponse> {
  //   const url = `${NAV_URL}/by-courseid/${courseId}`; // Adjust your URL as needed
  //   return this._http.delete<DeleteResponse>(NAV_URL, { 
  //     headers: { 'Password': password } 
  //   });
  // }

  getProfessorListByEmail(email : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/professorlistbyemail/`+email);
  }

  addNewChapters(chapter : Chapter) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addnewchapter`,chapter);
  }

  getProfileDetails(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/professorprofileDetails/`+loggedUser);
  }
  
  UpdateUserProfile(professor : any):Observable<any>
  {
    return this._http.put<any>(`${NAV_URL}/updateprofessor`,professor);
  }
  
  getCourseListNames() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getcoursenames/`);
  }
  getAllCourse() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getAllCourse/`)
  }

  getCourseById(courseid: string) {
    return this._http.get<any>(`${NAV_URL}/getCourseById/${courseid}`);
  }

  updateCourseById(courseid: string, updatedCourse: Course) {
    return this._http.put<any>(`${NAV_URL}/update/${courseid}`, updatedCourse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Headers for HTTP requests
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
    // Get chapter by ID
    getChapterById(id: string): Observable<Chapter> {
      return this._http.get<Chapter>(`${NAV_URL}/chapters/${id}`);
    }
    
    // professor.service.ts
    updateChapter(id: string, chapter: Chapter): Observable<any> {
      return this._http.put(`${NAV_URL}/updatechapters/${id}`, chapter);
    }

    getChapterByCourseId(courseid: string): Observable<Chapter[]> {
      return this._http.get<Chapter[]>(`${NAV_URL}/course/${courseid}`);
    }

    // Get all chapters
    getAllChapters(): Observable<Chapter[]> {
      return this._http.get<Chapter[]>(`${NAV_URL}/chapters`);
    }
    

    //Added by SD
    getProfessorById(id: string): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/getProfessorById/${id}`);
    }
    
    updateProfessor(professorId: string, updatedData: any): Observable<any> {
      return this._http.put(`${NAV_URL}/updateProfessor/${professorId}`, updatedData);
    }
    
    
      // ✅ Delete professor (string ID)
      deleteProfessorById(professorId: string): Observable<any> {
        return this._http.delete(`${NAV_URL}/deleteProfessorById/${professorId}`)
  
      }
  
      deleteCourseById(courseId: string): Observable<string> {
        return this._http.delete(`${NAV_URL}/deleteCourseById/${courseId}`, { responseType: 'text' });
      }
  
  
}

